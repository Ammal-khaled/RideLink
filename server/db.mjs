import { DatabaseSync } from 'node:sqlite';
import { randomBytes, scryptSync, timingSafeEqual, createHash, randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
export const id=()=>randomUUID();
export const hashToken=t=>createHash('sha256').update(t).digest('hex');
export function passwordHash(password){const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex');}
export function verifyPassword(password,stored){try{const [salt,key]=stored.split(':');return timingSafeEqual(scryptSync(password,salt,64),Buffer.from(key,'hex'));}catch{return false}}
export function openDb(path){if(path!==':memory:')mkdirSync(dirname(path),{recursive:true});const db=new DatabaseSync(path);db.exec(`PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL;
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN ('customer','shop','system')),store_id TEXT,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS stores(id TEXT PRIMARY KEY,name TEXT NOT NULL,city TEXT NOT NULL,email TEXT NOT NULL,status TEXT NOT NULL CHECK(status IN ('active','pending','suspended')));
CREATE TABLE IF NOT EXISTS cars(id TEXT PRIMARY KEY,store_id TEXT NOT NULL REFERENCES stores(id),payload TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS bookings(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),store_id TEXT NOT NULL,car_id TEXT NOT NULL,start TEXT NOT NULL,end TEXT NOT NULL,status TEXT NOT NULL,payload TEXT NOT NULL,created_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS booking_overlap ON bookings(car_id,status,start,end);
CREATE TABLE IF NOT EXISTS reviews(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),booking_id TEXT UNIQUE NOT NULL REFERENCES bookings(id),store_id TEXT NOT NULL,rating INTEGER NOT NULL,text TEXT NOT NULL,status TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS settings(id INTEGER PRIMARY KEY CHECK(id=1),payload TEXT NOT NULL);
INSERT OR IGNORE INTO settings VALUES(1,'{"deliveryFee":5,"promotion":""}');
CREATE TABLE IF NOT EXISTS audit(id TEXT PRIMARY KEY,user_id TEXT,action TEXT NOT NULL,record_id TEXT,created_at TEXT NOT NULL);
`);return db;}
export function publicUser(u){return {id:u.id,name:u.name,email:u.email,role:u.role,storeId:u.store_id,active:!!u.active};}
