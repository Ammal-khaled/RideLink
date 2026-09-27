import {randomBytes} from 'node:crypto';
import {id,passwordHash,registerCustomer} from './db.mjs';

const stores=[
 {name:'Al Noor Rent a Car',city:'Dubai',email:'rentals@alnoorrentacar.ae'},
 {name:'Marina Motors',city:'Abu Dhabi',email:'hello@marinamotors.ae'},
 {name:'Sharjah Auto Rentals',city:'Sharjah',email:'bookings@sharjahautorentals.ae'},
 {name:'Ajman Wheels',city:'Ajman',email:'rentals@ajmanwheels.ae'},
];
const fleet=[
 ['Nissan Sunny','Economy',110,800,5,'available','uae-sedan.jpg',25],['Toyota Corolla','Comfort',175,1000,5,'available','uae-sedan.jpg',30],['Nissan X-Trail','SUV',320,1500,7,'available','uae-suv.jpg',35],['BMW 5 Series','Premium',680,2500,5,'available','uae-luxury.jpg',30],['Toyota Land Cruiser','SUV',390,2000,7,'maintenance','uae-suv.jpg',45],
 ['Kia Pegas','Economy',95,700,5,'available','uae-sedan.jpg',35],['Toyota Camry','Comfort',190,1200,5,'available','uae-sedan.jpg',30],['Hyundai Tucson','SUV',295,1500,5,'available','uae-suv.jpg',40],['Mercedes-Benz E-Class','Premium',720,3000,5,'available','uae-luxury.jpg',30],['Nissan Patrol','SUV',400,2500,7,'maintenance','uae-suv.jpg',45],
 ['Suzuki Dzire','Economy',105,700,5,'available','uae-sedan.jpg',30],['Honda Accord','Comfort',210,1300,5,'available','uae-sedan.jpg',30],['Mitsubishi Pajero','SUV',350,1800,7,'available','uae-suv.jpg',40],['Porsche Macan','Premium',790,3500,5,'available','uae-premium.jpg',35],['Jetour T2','SUV',280,1500,5,'available','uae-suv.jpg',40],
 ['Kia Picanto','Economy',90,600,4,'available','uae-sedan.jpg',30],['Toyota Camry Hybrid','Comfort',205,1400,5,'available','uae-sedan.jpg',30],['Hyundai Creta','SUV',260,1400,5,'available','uae-suv.jpg',35],['Range Rover Velar','Premium',890,4000,5,'maintenance','uae-premium.jpg',40],['Toyota Fortuner','SUV',340,1800,7,'available','uae-suv.jpg',40],
];
const customers=[
 ['Fatima Al Mazrouei','fatima.mazrouei@demo.ridelink.ae','+971 50 234 7812'],['Rashid Al Falasi','rashid.alfalasi@demo.ridelink.ae','+971 52 681 3490'],['Priya Sharma','priya.sharma@demo.ridelink.ae','+971 54 215 6608'],['Arjun Patel','arjun.patel@demo.ridelink.ae','+971 55 782 1043'],['Mariam Haddad','mariam.haddad@demo.ridelink.ae','+971 56 390 2451'],['Omar Khoury','omar.khoury@demo.ridelink.ae','+971 58 420 7716'],['Sarah Thompson','sarah.thompson@demo.ridelink.ae','+971 50 613 2084'],['Mohammed Rahman','mohammed.rahman@demo.ridelink.ae','+971 52 909 1357'],['Aisha Al Mansoori','aisha.mansoori@demo.ridelink.ae','+971 54 332 8701'],['David Wilson','david.wilson@demo.ridelink.ae','+971 55 164 9280'],['Khalid Al Nuaimi','khalid.alnuaimi@demo.ridelink.ae','+971 56 725 4893'],['Nadia Abbas','nadia.abbas@demo.ridelink.ae','+971 58 103 6672'],['Rohan Mehta','rohan.mehta@demo.ridelink.ae','+971 50 891 4062'],['Layla Saeed','layla.saeed@demo.ridelink.ae','+971 52 477 3198'],['James Miller','james.miller@demo.ridelink.ae','+971 54 705 8231'],
];
const plans=[
 {car:0,customer:0,start:-40,days:3,status:'completed'}, {car:1,customer:1,start:-25,days:2,status:'completed'}, {car:2,customer:2,start:-16,days:4,status:'completed'}, {car:3,customer:3,start:-55,days:3,status:'completed'}, {car:4,customer:4,start:-8,days:2,status:'completed'},
 {car:5,customer:5,start:0,days:3,status:'approved'}, {car:6,customer:6,start:2,days:3,status:'approved'}, {car:7,customer:7,start:7,days:3,status:'approved'}, {car:8,customer:8,start:1,days:4,status:'approved'},
 {car:15,customer:9,start:3,days:3,status:'pending'}, {car:16,customer:10,start:10,days:3,status:'pending'}, {car:17,customer:11,start:0,days:2,status:'pending'}, {car:19,customer:12,start:14,days:2,status:'pending'}, {car:13,customer:13,start:5,days:2,status:'rejected'}, {car:14,customer:14,start:6,days:2,status:'cancelled'},
];
const reviews=[
 ['The car was spotless and ready right on time.',5],['Easy collection near the hotel and great communication.',5],['Smooth booking and a comfortable drive for our family.',4],['Very helpful team. The handover took only a few minutes.',5],
];
const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Dubai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const day=offset=>{const d=new Date(`${today()}T00:00:00Z`);d.setUTCDate(d.getUTCDate()+offset);return d.toISOString().slice(0,10)};

export function seedDemo(db){
 if(process.env.NODE_ENV==='production'&&Object.hasOwn(process.env,'DISABLE_DEMO_SEED'))return false;
 db.exec('BEGIN IMMEDIATE');const credentials=[];
 try{
  if(db.prepare('SELECT COUNT(*) AS count FROM stores').get().count){db.exec('COMMIT');return false}
  const storeRows=stores.map(s=>({...s,id:id(),status:'active'}));
  for(const s of storeRows)db.prepare('INSERT INTO stores VALUES(?,?,?,?,?)').run(s.id,s.name,s.city,s.email,s.status);
  for(let i=0;i<storeRows.length;i++){
   const s=storeRows[i],name=`${s.name} Manager`,email=`manager@${s.email.split('@')[1]}`,password=randomBytes(18).toString('base64url');
   db.prepare('INSERT INTO users VALUES(?,?,?,?,?,?,?,?)').run(id(),email,name,passwordHash(password),'shop',s.id,1,new Date().toISOString());credentials.push({email,password});
  }
  const cars=fleet.map(([name,category,price,deposit,seats,status,image,eta],i)=>{const s=storeRows[Math.floor(i/5)],car={id:id(),name,city:s.city,category,price,deposit,seats,status,image:`/images/${image}`,eta:`${eta} min`,description:`${name} rental in ${s.city}. Well maintained and ready for your next UAE trip.`,storeId:s.id};db.prepare('INSERT INTO cars VALUES(?,?,?)').run(car.id,s.id,JSON.stringify(car));return car});
  const users=customers.map(([name,email])=>registerCustomer(db,name,email,randomBytes(24).toString('base64url')));
  const bookings=plans.map(p=>{const car=cars[p.car],user=users[p.customer],start=day(p.start),end=day(p.start+p.days),delivery=p.customer%3===0,fee=delivery?25:0,item={id:`RL-${id()}`,userId:user.id,storeId:car.storeId,carId:car.id,carName:car.name,customer:user.name,phone:customers[p.customer][2],start,end,days:p.days,rate:car.price,fee,total:Math.round((p.days*car.price+fee)*100)/100,deposit:car.deposit,delivery,address:delivery?`${100+p.customer} Marina Walk, ${car.city}`:'',eta:car.eta,payment:'Cash',status:p.status,createdAt:p.start<0?`${day(p.start-3)}T08:00:00.000Z`:new Date().toISOString()};db.prepare('INSERT INTO bookings VALUES(?,?,?,?,?,?,?,?,?)').run(item.id,user.id,item.storeId,item.carId,start,end,item.status,JSON.stringify(item),item.createdAt);return item});
  for(let i=0;i<reviews.length;i++){const booking=bookings[i],user=users[i];db.prepare('INSERT INTO reviews VALUES(?,?,?,?,?,?,?)').run(id(),user.id,booking.id,booking.storeId,reviews[i][1],reviews[i][0],'published')}
  db.prepare('UPDATE settings SET payload=? WHERE id=1').run(JSON.stringify({deliveryFee:25,promotion:'UAE weekend escapes — book your next drive with RideLink.'}));
  db.exec('COMMIT');
 }catch(e){db.exec('ROLLBACK');throw e}
 for(const c of credentials)console.log(`Demo shop admin created — Email: ${c.email} | Password: ${c.password}`);
 console.log(`RideLink UAE demo data seeded: ${stores.length} stores, ${fleet.length} cars, ${plans.length} bookings.`);
 return true;
}
