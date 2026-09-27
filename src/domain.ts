export type Car = {id:string; name:string; city:string; category:string; price:number; deposit:number; eta:string; image:string; description:string; storeId:string; status:'available'|'maintenance'; seats:number};
export type Booking = {id:string; carId:string; carName:string; storeId:string; customer:string; phone:string; start:string; end:string; delivery:boolean; address:string; payment:string; days:number; rate:number; fee:number; total:number; deposit:number; eta:string; status:'pending'|'approved'|'rejected'|'cancelled'|'completed'; createdAt:string};
export type Store = {id:string; name:string; city:string; email:string; status:'active'|'pending'|'suspended'};
export type Admin = {id:string; name:string; email:string; storeId:string; active:boolean};
export type Review = {id:string; name:string; storeId:string; rating:number; text:string; status:'pending'|'published'|'hidden'};
export type Settings = {deliveryFee:number; promotion:string};
export type Data = {cars:Car[]; bookings:Booking[]; stores:Store[]; admins:Admin[]; reviews:Review[]; settings:Settings};
export function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Amman',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
export function rentalDays(start:string,end:string){const a=Date.parse(start+'T00:00:00Z'),b=Date.parse(end+'T00:00:00Z');if(!Number.isFinite(a)||!Number.isFinite(b)||b<=a) return 0;return Math.round((b-a)/86400000);}
export function quote(price:number,start:string,end:string,delivery:boolean,fee:number){const days=rentalDays(start,end);return {days,total:days*price+(delivery?fee:0)};}
export function overlaps(a:string,b:string,c:string,d:string){return a<d && c<b;}
export function available(car:Car,bookings:Booking[],start:string,end:string,ignoreId?:string){return car.status==='available'&&!bookings.some(b=>b.id!==ignoreId&&b.carId===car.id&&b.status==='approved'&&overlaps(start,end,b.start,b.end));}
export function fleet(cars:Car[],bookings:Booking[],date=today()){const rented=cars.filter(c=>bookings.some(b=>b.carId===c.id&&b.status==='approved'&&b.start<=date&&b.end>date)).length;const maintenance=cars.filter(c=>c.status==='maintenance').length;return {total:cars.length,rented,maintenance,available:cars.filter(c=>c.status==='available'&&!bookings.some(b=>b.carId===c.id&&b.status==='approved'&&b.start<=date&&b.end>date)).length};}
