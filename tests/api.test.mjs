import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createApp} from '../server/index.mjs';
import {id,passwordHash} from '../server/db.mjs';
import {seedDemo} from '../server/seed.mjs';
function createUnseededApp(options){const env={node:process.env.NODE_ENV,disabled:process.env.DISABLE_DEMO_SEED};process.env.NODE_ENV='production';process.env.DISABLE_DEMO_SEED='1';try{return createApp(options)}finally{if(env.node===undefined)delete process.env.NODE_ENV;else process.env.NODE_ENV=env.node;if(env.disabled===undefined)delete process.env.DISABLE_DEMO_SEED;else process.env.DISABLE_DEMO_SEED=env.disabled}}
function createSeededApp(options){const env={node:process.env.NODE_ENV,disabled:process.env.DISABLE_DEMO_SEED};process.env.NODE_ENV='test';delete process.env.DISABLE_DEMO_SEED;try{return createApp(options)}finally{if(env.node===undefined)delete process.env.NODE_ENV;else process.env.NODE_ENV=env.node;if(env.disabled===undefined)delete process.env.DISABLE_DEMO_SEED;else process.env.DISABLE_DEMO_SEED=env.disabled}}
test('an empty database is seeded with UAE demo data at startup',()=>{
 const {db}=createSeededApp({dbPath:':memory:'});
 try{
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM stores').get().n,4);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM cars').get().n,20);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM users WHERE role='shop'").get().n,4);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM users WHERE role='customer'").get().n,15);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM bookings').get().n,15);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM reviews WHERE status='published'").get().n,4);
  assert.equal(db.prepare("SELECT COUNT(*) AS n FROM cars WHERE json_extract(payload,'$.status')='maintenance'").get().n,3);
  assert.deepEqual(db.prepare('SELECT status,COUNT(*) AS n FROM bookings GROUP BY status ORDER BY status').all().map(({status,n})=>[status,n]),[['approved',4],['cancelled',1],['completed',5],['pending',4],['rejected',1]]);
  assert.deepEqual(db.prepare('SELECT city FROM stores ORDER BY city').all().map(s=>s.city),['Abu Dhabi','Ajman','Dubai','Sharjah']);
  assert.equal(JSON.parse(db.prepare('SELECT payload FROM settings WHERE id=1').get().payload).deliveryFee,25);
  assert.equal(seedDemo(db),false,'a second seed attempt leaves existing stores untouched');
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM stores').get().n,4);
 }finally{db.close()}
});
test('demo seed can be disabled on production startup',()=>{
 const {db}=createUnseededApp({dbPath:':memory:'});
 try{assert.equal(db.prepare('SELECT COUNT(*) AS n FROM stores').get().n,0)}finally{db.close()}
});
test('authenticated API enforces roles, server prices and booking conflicts',async()=>{
 const {server,db}=createUnseededApp({dbPath:':memory:'});server.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${server.address().port}/api`;
 const call=async(path,method='GET',body,token)=>{const r=await fetch(base+path,{method,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{})});return {status:r.status,body:await r.json()}};
 try{const uid=id();db.prepare('INSERT INTO users VALUES(?,?,?,?,?,?,?,?)').run(uid,'owner@example.com','Owner',passwordHash('Strong-password-123'),'system',null,1,new Date().toISOString());
 assert.equal((await call('/admin/state')).status,401);
 assert.equal((await call('/auth/login','POST',{email:'owner@example.com',password:'wrong'})).status,401);
 const owner=(await call('/auth/login','POST',{email:'owner@example.com',password:'Strong-password-123'})).body.token;
 const missingStoreCar=await call('/admin/cars','POST',{name:'Toyota',category:'Comfort',price:45,deposit:50,eta:'30–45',image:'/images/camry.jpg',description:'Rental vehicle',seats:5,status:'available',storeId:'missing-store'},owner);assert.equal(missingStoreCar.status,404);
 const s=(await call('/admin/stores','POST',{name:'Actual Rental Shop',city:'Dubai',email:'shop@example.com'},owner)).body;
 assert.equal(s.status,'pending');await call('/admin/stores/'+s.id,'PATCH',{status:'active'},owner);
 const other=(await call('/admin/stores','POST',{name:'Other Shop',city:'Sharjah',email:'other@example.com'},owner)).body;await call('/admin/stores/'+other.id,'PATCH',{status:'active'},owner);
 const admin=(await call('/admin/users','POST',{name:'Shop Manager',email:'manager@example.com',password:'Strong-password-456',storeId:s.id},owner)).body;
 const shop=(await call('/auth/login','POST',{email:'manager@example.com',password:'Strong-password-456'})).body.token;
 assert.equal((await call('/admin/settings','PUT',{deliveryFee:1,promotion:'attack'},shop)).status,403);
 const car=(await call('/admin/cars','POST',{name:'Toyota',category:'Comfort',price:45,deposit:50,eta:'30–45',image:'/images/camry.jpg',description:'Rental vehicle',seats:5,status:'available',storeId:other.id},shop)).body;
 assert.equal(car.storeId,s.id,'shop cannot forge another store association');
 const c=(await call('/auth/register','POST',{name:'Customer',email:'customer@example.com',password:'Customer-pass-123',role:'system'})).body;assert.equal(c.user.role,'customer');
 const c2=(await call('/auth/register','POST',{name:'Other',email:'othercustomer@example.com',password:'Customer-pass-123'})).body;
 assert.equal((await call('/admin/state','GET',null,c.token)).status,403);
 const payload={carId:car.id,start:'2027-01-10',end:'2027-01-12',delivery:true,address:'Test street',phone:'+962 79 123 4567',payment:'Cash',total:1,deposit:0};
 const booked=await call('/bookings','POST',payload,c.token);assert.equal(booked.status,201);assert.equal(booked.body.total,95);assert.equal(booked.body.deposit,50);
 const duplicate=(await call('/bookings','POST',payload,c2.token)).body;
 assert.equal((await call('/bookings/'+booked.body.id,'PATCH',{status:'approved'},c.token)).status,403);
 assert.equal((await call('/bookings/'+booked.body.id,'PATCH',{status:'approved'},shop)).status,200);
 assert.equal((await call('/bookings/'+duplicate.id,'PATCH',{status:'approved'},shop)).status,409);
 assert.equal((await call('/bookings','POST',payload,c.token)).status,409);
 assert.equal((await call('/bookings','GET',null,c2.token)).body.length,1);
 assert.equal((await call('/bookings/'+booked.body.id,'PATCH',{status:'cancelled'},c2.token)).status,403);
 assert.equal((await call('/admin/cars/'+car.id,'DELETE',{},shop)).status,409);
 assert.equal((await call('/admin/cars/'+car.id,'PUT',{...car,status:'maintenance'},shop)).status,409);
 assert.equal((await call('/reviews','POST',{bookingId:booked.body.id,rating:5,text:'Great'},c.token)).status,403);
 await call('/bookings/'+booked.body.id,'PATCH',{status:'completed'},shop);
 assert.equal((await call('/reviews','POST',{bookingId:booked.body.id,rating:5,text:'Great'},c.token)).status,201);
 assert.equal((await call('/catalog')).body.reviews.length,0);
 const review=(await call('/admin/state','GET',null,owner)).body.reviews[0];await call('/admin/reviews/'+review.id,'PATCH',{status:'published'},owner);assert.equal((await call('/catalog')).body.reviews.length,1);
 await call('/admin/stores/'+s.id,'PATCH',{status:'suspended'},owner);assert.equal((await call('/catalog')).body.cars.length,0);assert.equal((await call('/admin/state','GET',null,shop)).status,403);
 await call('/admin/users/'+admin.id,'PATCH',{active:false},owner);assert.equal((await call('/auth/login','POST',{email:'manager@example.com',password:'Strong-password-456'})).status,401);
 await call('/auth/logout','POST',{},c.token);assert.equal((await call('/bookings','GET',null,c.token)).status,401);
 }finally{server.close();await once(server,'close');db.close()}
});
