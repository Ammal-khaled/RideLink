import {randomBytes} from 'node:crypto';
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {openDb,id,passwordHash} from './db.mjs';
const db=openDb(process.env.DATABASE_PATH||resolve('.runtime/ridelink.sqlite'));
if(db.prepare("SELECT id FROM users WHERE role='system'").get()){console.log('System administrator already exists. No account was changed.');db.close();process.exit(0)}
const email=process.env.ADMIN_EMAIL||'owner@ridelink.local';const password=process.env.ADMIN_PASSWORD||randomBytes(24).toString('base64url');
if(password.length<12)throw new Error('ADMIN_PASSWORD must contain at least 12 characters');
db.prepare('INSERT INTO users VALUES(?,?,?,?,?,?,?,?)').run(id(),email,'RideLink owner',passwordHash(password),'system',null,1,new Date().toISOString());
mkdirSync('.local',{recursive:true});writeFileSync('.local/admin-credentials.txt',`RideLink local system administrator\nEmail: ${email}\nPassword: ${password}\n\nKeep this file private. It is excluded from Git.\n`,{mode:0o600});db.close();console.log('System administrator created. Credentials saved to .local/admin-credentials.txt (excluded from Git). No sample data was added.');
