// Mock Data for RideLink Car Rental Application
// This file contains comprehensive dummy data for development and testing

export interface Car {
  id: string;
  name: string;
  city: string;
  pricePerDay: number;
  image: string;
  description: string;
  depositRequired: boolean;
  depositAmount?: number;
  deliveryTimeMinutes: number;
  category: 'economy' | 'compact' | 'luxury' | 'suv';
  status?: 'available' | 'rented' | 'maintenance';
  features?: string[];
  year?: number;
  transmission?: 'automatic' | 'manual';
  fuelType?: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  seats?: number;
  mileage?: number;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  carName: string;
  city: string;
  startDate: string;
  endDate: string;
  days: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'efawateercom' | 'card';
  delivery: boolean;
  deliveryAddress?: string;
  pickupTime?: string;
  notes?: string;
}

export interface Store {
  id: string;
  name: string;
  admin: string;
  adminEmail: string;
  city: string;
  address: string;
  phone: string;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  carsCount: number;
  availableCars: number;
  rentedCars: number;
  maintenanceCars: number;
  carCategories: CarCategory[];
  bookingsCount: number;
  monthlyRevenue: number;
  rating: number;
  joinDate: string;
  image: string;
  lastActive: string;
  totalDistance: number;
}

export interface CarCategory {
  name: string;
  total: number;
  available: number;
  rented: number;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  storeName: string;
  storeId: string;
  role: 'admin' | 'super_admin';
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
  joinDate: string;
  permissions: string[];
  avatar: string;
}

export interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  storeName: string;
  carName: string;
  rating: number;
  reviewText: string;
  date: string;
  status: 'published' | 'flagged' | 'hidden' | 'pending';
  flagCount: number;
  flagReasons: string[];
  adminResponse?: string;
}

// Cities in Jordan
export const cities = [
  'Amman',
  'Irbid',
  'Zarqa',
  'Aqaba',
  'Salt',
  'Madaba',
  'Jerash',
  'Mafraq',
  'Karak',
  'Tafilah',
  'Ma\'an',
  'Ajloun'
];

// Extensive Car Data
export const cars: Car[] = [
  // Economy Cars
  {
    id: '1',
    name: 'Toyota Yaris 2024',
    city: 'Amman',
    pricePerDay: 25,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    description: 'Fuel-efficient compact car perfect for city driving. Great for daily commutes and short trips.',
    depositRequired: false,
    deliveryTimeMinutes: 30,
    category: 'economy',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 2500,
    features: ['Air Conditioning', 'Bluetooth', 'USB Ports', 'Power Windows']
  },
  {
    id: '2',
    name: 'Hyundai Accent 2024',
    city: 'Irbid',
    pricePerDay: 28,
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&h=300&fit=crop',
    description: 'Reliable and affordable sedan with excellent fuel economy. Ideal for budget-conscious travelers.',
    depositRequired: false,
    deliveryTimeMinutes: 45,
    category: 'economy',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 3200,
    features: ['Air Conditioning', 'Radio', 'Power Steering', 'Central Locking']
  },
  {
    id: '3',
    name: 'Kia Rio 2024',
    city: 'Zarqa',
    pricePerDay: 26,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
    description: 'Stylish economy car with modern features and comfortable interior. Great value for money.',
    depositRequired: false,
    deliveryTimeMinutes: 50,
    category: 'economy',
    status: 'rented',
    year: 2024,
    transmission: 'manual',
    fuelType: 'petrol',
    seats: 5,
    mileage: 1800,
    features: ['Air Conditioning', 'Bluetooth', 'Backup Camera']
  },
  {
    id: '4',
    name: 'Nissan Sunny 2023',
    city: 'Aqaba',
    pricePerDay: 24,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    description: 'Spacious economy sedan with proven reliability. Perfect for small families and groups.',
    depositRequired: false,
    deliveryTimeMinutes: 60,
    category: 'economy',
    status: 'available',
    year: 2023,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 15000,
    features: ['Air Conditioning', 'Power Windows', 'CD Player']
  },
  
  // Compact Cars
  {
    id: '5',
    name: 'Toyota Camry 2024',
    city: 'Amman',
    pricePerDay: 45,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    description: 'Comfortable sedan perfect for business trips and family outings. Features automatic transmission, air conditioning, and modern safety features.',
    depositRequired: true,
    depositAmount: 200,
    deliveryTimeMinutes: 45,
    category: 'compact',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    mileage: 1200,
    features: ['Leather Seats', 'Sunroof', 'Navigation', 'Cruise Control', 'Lane Assist']
  },
  {
    id: '6',
    name: 'Honda Accord 2024',
    city: 'Amman',
    pricePerDay: 48,
    image: 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop',
    description: 'Premium midsize sedan with advanced safety features and luxurious interior. Excellent for long-distance travel.',
    depositRequired: true,
    depositAmount: 200,
    deliveryTimeMinutes: 40,
    category: 'compact',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 2100,
    features: ['Leather Seats', 'Apple CarPlay', 'Android Auto', 'Heated Seats', 'Parking Sensors']
  },
  {
    id: '7',
    name: 'Nissan Altima 2024',
    city: 'Zarqa',
    pricePerDay: 40,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    description: 'Reliable and economical sedan with modern features. Great value for money with comfortable seating for 5 passengers.',
    depositRequired: false,
    deliveryTimeMinutes: 75,
    category: 'compact',
    status: 'maintenance',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 3500,
    features: ['Air Conditioning', 'Bluetooth', 'Rear Camera', 'Cruise Control']
  },
  {
    id: '8',
    name: 'Mazda 6 2024',
    city: 'Irbid',
    pricePerDay: 47,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    description: 'Elegant sedan with sporty handling and premium features. Perfect blend of style and performance.',
    depositRequired: true,
    depositAmount: 200,
    deliveryTimeMinutes: 55,
    category: 'compact',
    status: 'rented',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 1800,
    features: ['Leather Seats', 'Bose Sound System', 'Sunroof', 'Adaptive Cruise Control']
  },
  {
    id: '9',
    name: 'Volkswagen Passat 2024',
    city: 'Salt',
    pricePerDay: 50,
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&h=300&fit=crop',
    description: 'European luxury sedan with sophisticated design and cutting-edge technology.',
    depositRequired: true,
    depositAmount: 250,
    deliveryTimeMinutes: 90,
    category: 'compact',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    mileage: 2800,
    features: ['Digital Cockpit', 'Panoramic Sunroof', 'Massage Seats', 'Wireless Charging']
  },

  // SUVs
  {
    id: '10',
    name: 'Honda CR-V 2024',
    city: 'Irbid',
    pricePerDay: 65,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    description: 'Spacious SUV ideal for family trips and adventures. All-wheel drive, premium interior, and excellent fuel efficiency.',
    depositRequired: true,
    depositAmount: 300,
    deliveryTimeMinutes: 60,
    category: 'suv',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 7,
    mileage: 1500,
    features: ['AWD', '3rd Row Seats', 'Power Liftgate', 'Blind Spot Monitor', 'Roof Rack']
  },
  {
    id: '11',
    name: 'Toyota RAV4 2024',
    city: 'Amman',
    pricePerDay: 62,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&h=300&fit=crop',
    description: 'Popular compact SUV with exceptional reliability and off-road capability. Perfect for family adventures.',
    depositRequired: true,
    depositAmount: 300,
    deliveryTimeMinutes: 35,
    category: 'suv',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    mileage: 2200,
    features: ['AWD', 'Panoramic Sunroof', 'JBL Sound System', 'Power Seats', 'Ventilated Seats']
  },
  {
    id: '12',
    name: 'Hyundai Tucson 2024',
    city: 'Madaba',
    pricePerDay: 58,
    image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=400&h=300&fit=crop',
    description: 'Modern SUV with striking design and advanced technology. Comfortable for long journeys.',
    depositRequired: true,
    depositAmount: 250,
    deliveryTimeMinutes: 70,
    category: 'suv',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 3100,
    features: ['Leather Seats', 'Digital Cluster', '360 Camera', 'Heated Steering Wheel']
  },
  {
    id: '13',
    name: 'Nissan X-Trail 2024',
    city: 'Jerash',
    pricePerDay: 60,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    description: 'Versatile 7-seater SUV with spacious interior and advanced safety features.',
    depositRequired: true,
    depositAmount: 280,
    deliveryTimeMinutes: 85,
    category: 'suv',
    status: 'rented',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 7,
    mileage: 1900,
    features: ['7 Seats', 'ProPILOT Assist', 'Bose Audio', 'Power Liftgate', 'Tri-Zone Climate']
  },
  {
    id: '14',
    name: 'Mazda CX-5 2024',
    city: 'Aqaba',
    pricePerDay: 63,
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&h=300&fit=crop',
    description: 'Premium compact SUV with refined driving dynamics and upscale interior.',
    depositRequired: true,
    depositAmount: 300,
    deliveryTimeMinutes: 65,
    category: 'suv',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 2600,
    features: ['AWD', 'Bose Sound', 'Head-Up Display', 'Traffic Jam Assist', 'Power Tailgate']
  },
  {
    id: '15',
    name: 'Kia Sportage 2024',
    city: 'Mafraq',
    pricePerDay: 59,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
    description: 'Bold-designed SUV with comprehensive safety features and comfortable ride.',
    depositRequired: true,
    depositAmount: 280,
    deliveryTimeMinutes: 95,
    category: 'suv',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    mileage: 1400,
    features: ['AWD', 'Dual Sunroof', 'Wireless Phone Charger', '360 Camera', 'Smart Cruise Control']
  },

  // Luxury Cars
  {
    id: '16',
    name: 'BMW 3 Series 2024',
    city: 'Amman',
    pricePerDay: 85,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    description: 'Luxury sedan with premium features and exceptional performance. Perfect for special occasions and business meetings.',
    depositRequired: true,
    depositAmount: 500,
    deliveryTimeMinutes: 30,
    category: 'luxury',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 800,
    features: ['Premium Leather', 'Harman Kardon', 'Ambient Lighting', 'Gesture Control', 'Heads-Up Display']
  },
  {
    id: '17',
    name: 'Mercedes-Benz C-Class 2024',
    city: 'Amman',
    pricePerDay: 90,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    description: 'Elegant luxury sedan with cutting-edge technology and superior comfort. The ultimate executive car.',
    depositRequired: true,
    depositAmount: 600,
    deliveryTimeMinutes: 25,
    category: 'luxury',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 600,
    features: ['Nappa Leather', 'Burmester Sound', 'MBUX Infotainment', 'Massage Seats', 'Air Balance']
  },
  {
    id: '18',
    name: 'Audi A4 2024',
    city: 'Irbid',
    pricePerDay: 82,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    description: 'Sophisticated German luxury sedan with quattro all-wheel drive and virtual cockpit.',
    depositRequired: true,
    depositAmount: 500,
    deliveryTimeMinutes: 50,
    category: 'luxury',
    status: 'rented',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 1100,
    features: ['Quattro AWD', 'Virtual Cockpit', 'B&O Sound', 'Matrix LED', 'Ventilated Seats']
  },
  {
    id: '19',
    name: 'Lexus ES 2024',
    city: 'Aqaba',
    pricePerDay: 88,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    description: 'Japanese luxury sedan with unmatched reliability and serene cabin. Ultimate comfort and refinement.',
    depositRequired: true,
    depositAmount: 550,
    deliveryTimeMinutes: 55,
    category: 'luxury',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    mileage: 900,
    features: ['Mark Levinson Audio', 'Semi-Aniline Leather', 'Panoramic Roof', 'Shiatsu Massage', 'Climate Concierge']
  },
  {
    id: '20',
    name: 'Genesis G80 2024',
    city: 'Salt',
    pricePerDay: 92,
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&h=300&fit=crop',
    description: 'Korean luxury sedan offering exceptional value with premium features and elegant design.',
    depositRequired: true,
    depositAmount: 580,
    deliveryTimeMinutes: 80,
    category: 'luxury',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    mileage: 750,
    features: ['Nappa Leather', 'Lexicon Audio', '3D Digital Cluster', 'Ergo Motion Seats', 'Highway Driving Assist']
  },
  {
    id: '21',
    name: 'BMW 5 Series 2024',
    city: 'Amman',
    pricePerDay: 110,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    description: 'Executive luxury sedan with advanced driver assistance and powerful performance.',
    depositRequired: true,
    depositAmount: 700,
    deliveryTimeMinutes: 30,
    category: 'luxury',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'diesel',
    seats: 5,
    mileage: 500,
    features: ['Executive Lounge Seats', 'Bowers & Wilkins', 'Sky Lounge Panoramic', 'Driving Assistant Pro', 'Laser Lights']
  },
  {
    id: '22',
    name: 'Mercedes-Benz E-Class 2024',
    city: 'Amman',
    pricePerDay: 115,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    description: 'Premium executive sedan with state-of-the-art technology and unparalleled comfort.',
    depositRequired: true,
    depositAmount: 750,
    deliveryTimeMinutes: 25,
    category: 'luxury',
    status: 'available',
    year: 2024,
    transmission: 'automatic',
    fuelType: 'hybrid',
    seats: 5,
    mileage: 400,
    features: ['ENERGIZING Comfort', 'MBUX Hyperscreen', 'Multicontour Seats', 'Digital Light', '4MATIC AWD']
  }
];

// Extensive Booking Data
export const bookings: Booking[] = [
  {
    id: '1',
    customerName: 'Ahmed Mohammed Al-Sayed',
    customerPhone: '+962 79 123 4567',
    customerEmail: 'ahmed.sayed@email.com',
    carName: 'Toyota Camry 2024',
    city: 'Amman',
    startDate: '2024-01-15',
    endDate: '2024-01-21',
    days: 6,
    totalAmount: 270,
    status: 'pending',
    paymentMethod: 'cash',
    delivery: true,
    deliveryAddress: 'Al-Abdali, Near City Mall',
    pickupTime: '10:00 AM',
    notes: 'Please call before delivery'
  },
  {
    id: '2',
    customerName: 'Sarah Al-Zahra Ibrahim',
    customerPhone: '+962 77 987 6543',
    customerEmail: 'sarah.alzahra@email.com',
    carName: 'Honda CR-V 2024',
    city: 'Irbid',
    startDate: '2024-01-18',
    endDate: '2024-01-24',
    days: 6,
    totalAmount: 390,
    status: 'confirmed',
    paymentMethod: 'efawateercom',
    delivery: false,
    pickupTime: '2:00 PM'
  },
  {
    id: '3',
    customerName: 'Omar Hassan Khaled',
    customerPhone: '+962 78 555 1234',
    customerEmail: 'omar.hassan@email.com',
    carName: 'BMW 3 Series 2024',
    city: 'Amman',
    startDate: '2024-01-20',
    endDate: '2024-01-26',
    days: 6,
    totalAmount: 510,
    status: 'pending',
    paymentMethod: 'cash',
    delivery: true,
    deliveryAddress: 'Sweifieh, Wakalat Street',
    pickupTime: '11:30 AM'
  },
  {
    id: '4',
    customerName: 'Fatima Khoury Ahmad',
    customerPhone: '+962 76 444 7890',
    customerEmail: 'fatima.khoury@email.com',
    carName: 'Nissan Altima 2024',
    city: 'Zarqa',
    startDate: '2024-01-10',
    endDate: '2024-01-15',
    days: 5,
    totalAmount: 200,
    status: 'completed',
    paymentMethod: 'cash',
    delivery: false,
    pickupTime: '9:00 AM'
  },
  {
    id: '5',
    customerName: 'Yousef Mahmoud Salem',
    customerPhone: '+962 79 234 5678',
    customerEmail: 'yousef.salem@email.com',
    carName: 'Mercedes-Benz C-Class 2024',
    city: 'Amman',
    startDate: '2024-01-22',
    endDate: '2024-01-25',
    days: 3,
    totalAmount: 270,
    status: 'confirmed',
    paymentMethod: 'efawateercom',
    delivery: true,
    deliveryAddress: 'Abdoun, Rainbow Street Area',
    pickupTime: '8:00 AM',
    notes: 'Business trip - need invoice'
  },
  {
    id: '6',
    customerName: 'Layla Abdullah Nasser',
    customerPhone: '+962 77 345 6789',
    customerEmail: 'layla.nasser@email.com',
    carName: 'Toyota RAV4 2024',
    city: 'Amman',
    startDate: '2024-01-16',
    endDate: '2024-01-19',
    days: 3,
    totalAmount: 186,
    status: 'completed',
    paymentMethod: 'card',
    delivery: false,
    pickupTime: '1:00 PM'
  },
  {
    id: '7',
    customerName: 'Khaled Youssef Ali',
    customerPhone: '+962 78 456 7890',
    customerEmail: 'khaled.ali@email.com',
    carName: 'Hyundai Accent 2024',
    city: 'Irbid',
    startDate: '2024-01-23',
    endDate: '2024-01-30',
    days: 7,
    totalAmount: 196,
    status: 'confirmed',
    paymentMethod: 'cash',
    delivery: true,
    deliveryAddress: 'University Street, Near Yarmouk University',
    pickupTime: '12:00 PM'
  },
  {
    id: '8',
    customerName: 'Noor Faisal Mustafa',
    customerPhone: '+962 76 567 8901',
    customerEmail: 'noor.mustafa@email.com',
    carName: 'Mazda CX-5 2024',
    city: 'Aqaba',
    startDate: '2024-01-19',
    endDate: '2024-01-24',
    days: 5,
    totalAmount: 315,
    status: 'confirmed',
    paymentMethod: 'efawateercom',
    delivery: false,
    pickupTime: '3:00 PM',
    notes: 'Vacation rental'
  },
  {
    id: '9',
    customerName: 'Ibrahim Tariq Saleh',
    customerPhone: '+962 79 678 9012',
    customerEmail: 'ibrahim.saleh@email.com',
    carName: 'Kia Rio 2024',
    city: 'Zarqa',
    startDate: '2024-01-11',
    endDate: '2024-01-13',
    days: 2,
    totalAmount: 52,
    status: 'completed',
    paymentMethod: 'cash',
    delivery: false,
    pickupTime: '10:00 AM'
  },
  {
    id: '10',
    customerName: 'Rania Jamal Othman',
    customerPhone: '+962 77 789 0123',
    customerEmail: 'rania.othman@email.com',
    carName: 'BMW 5 Series 2024',
    city: 'Amman',
    startDate: '2024-01-25',
    endDate: '2024-01-27',
    days: 2,
    totalAmount: 220,
    status: 'pending',
    paymentMethod: 'card',
    delivery: true,
    deliveryAddress: 'Shmeisani, Near Sheraton Hotel',
    pickupTime: '7:00 AM',
    notes: 'VIP client - special handling'
  },
  {
    id: '11',
    customerName: 'Hassan Ali Mahmoud',
    customerPhone: '+962 78 890 1234',
    customerEmail: 'hassan.mahmoud@email.com',
    carName: 'Volkswagen Passat 2024',
    city: 'Salt',
    startDate: '2024-01-17',
    endDate: '2024-01-20',
    days: 3,
    totalAmount: 150,
    status: 'confirmed',
    paymentMethod: 'cash',
    delivery: false,
    pickupTime: '11:00 AM'
  },
  {
    id: '12',
    customerName: 'Mariam Zaid Khalil',
    customerPhone: '+962 76 901 2345',
    customerEmail: 'mariam.khalil@email.com',
    carName: 'Hyundai Tucson 2024',
    city: 'Madaba',
    startDate: '2024-01-21',
    endDate: '2024-01-26',
    days: 5,
    totalAmount: 290,
    status: 'confirmed',
    paymentMethod: 'efawateercom',
    delivery: true,
    deliveryAddress: 'Madaba City Center',
    pickupTime: '9:30 AM'
  },
  {
    id: '13',
    customerName: 'Tariq Nabil Youssef',
    customerPhone: '+962 79 012 3456',
    customerEmail: 'tariq.youssef@email.com',
    carName: 'Lexus ES 2024',
    city: 'Aqaba',
    startDate: '2024-01-28',
    endDate: '2024-02-02',
    days: 5,
    totalAmount: 440,
    status: 'pending',
    paymentMethod: 'card',
    delivery: false,
    pickupTime: '2:30 PM',
    notes: 'Wedding celebration'
  },
  {
    id: '14',
    customerName: 'Dina Waleed Farah',
    customerPhone: '+962 77 123 4567',
    customerEmail: 'dina.farah@email.com',
    carName: 'Toyota Yaris 2024',
    city: 'Amman',
    startDate: '2024-01-14',
    endDate: '2024-01-16',
    days: 2,
    totalAmount: 50,
    status: 'completed',
    paymentMethod: 'cash',
    delivery: false,
    pickupTime: '4:00 PM'
  },
  {
    id: '15',
    customerName: 'Sami Rashid Qasim',
    customerPhone: '+962 78 234 5678',
    customerEmail: 'sami.qasim@email.com',
    carName: 'Nissan X-Trail 2024',
    city: 'Jerash',
    startDate: '2024-01-26',
    endDate: '2024-01-31',
    days: 5,
    totalAmount: 300,
    status: 'confirmed',
    paymentMethod: 'efawateercom',
    delivery: true,
    deliveryAddress: 'Jerash Archaeological Site Area',
    pickupTime: '8:30 AM',
    notes: 'Tourist group'
  },
  {
    id: '16',
    customerName: 'Hala Bassam Haddad',
    customerPhone: '+962 76 345 6789',
    customerEmail: 'hala.haddad@email.com',
    carName: 'Honda Accord 2024',
    city: 'Amman',
    startDate: '2024-01-12',
    endDate: '2024-01-14',
    days: 2,
    totalAmount: 96,
    status: 'completed',
    paymentMethod: 'card',
    delivery: false,
    pickupTime: '5:00 PM'
  },
  {
    id: '17',
    customerName: 'Majid Sameer Naji',
    customerPhone: '+962 79 456 7890',
    customerEmail: 'majid.naji@email.com',
    carName: 'Kia Sportage 2024',
    city: 'Mafraq',
    startDate: '2024-01-29',
    endDate: '2024-02-03',
    days: 5,
    totalAmount: 295,
    status: 'pending',
    paymentMethod: 'cash',
    delivery: false,
    pickupTime: '10:30 AM'
  },
  {
    id: '18',
    customerName: 'Amal Karim Shaker',
    customerPhone: '+962 77 567 8901',
    customerEmail: 'amal.shaker@email.com',
    carName: 'Genesis G80 2024',
    city: 'Salt',
    startDate: '2024-01-24',
    endDate: '2024-01-26',
    days: 2,
    totalAmount: 184,
    status: 'confirmed',
    paymentMethod: 'efawateercom',
    delivery: true,
    deliveryAddress: 'Salt Historical Center',
    pickupTime: '1:30 PM'
  },
  {
    id: '19',
    customerName: 'Waleed Fadi Mansour',
    customerPhone: '+962 78 678 9012',
    customerEmail: 'waleed.mansour@email.com',
    carName: 'Nissan Sunny 2023',
    city: 'Aqaba',
    startDate: '2024-01-13',
    endDate: '2024-01-17',
    days: 4,
    totalAmount: 96,
    status: 'completed',
    paymentMethod: 'cash',
    delivery: false,
    pickupTime: '6:00 PM'
  },
  {
    id: '20',
    customerName: 'Lina Adel Jamil',
    customerPhone: '+962 76 789 0123',
    customerEmail: 'lina.jamil@email.com',
    carName: 'Audi A4 2024',
    city: 'Irbid',
    startDate: '2024-01-27',
    endDate: '2024-01-30',
    days: 3,
    totalAmount: 246,
    status: 'cancelled',
    paymentMethod: 'card',
    delivery: false,
    pickupTime: '3:30 PM',
    notes: 'Customer cancelled due to travel change'
  }
];

// Extensive Store Data
export const stores: Store[] = [
  {
    id: '1',
    name: 'Elite Car Rental Amman',
    admin: 'Mohammed Al-Rashid',
    adminEmail: 'mohammed@elitecar.jo',
    city: 'Amman',
    address: 'Al-Abdali, Downtown Amman',
    phone: '+962 6 123 4567',
    status: 'active',
    carsCount: 28,
    availableCars: 18,
    rentedCars: 8,
    maintenanceCars: 2,
    carCategories: [
      { name: 'Economy', total: 8, available: 5, rented: 3 },
      { name: 'Compact', total: 10, available: 6, rented: 3 },
      { name: 'SUV', total: 6, available: 4, rented: 2 },
      { name: 'Luxury', total: 4, available: 3, rented: 0 }
    ],
    bookingsCount: 156,
    monthlyRevenue: 24680,
    rating: 4.8,
    joinDate: '2023-08-15',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    lastActive: '2024-01-20T10:30:00Z',
    totalDistance: 342000
  },
  {
    id: '2',
    name: 'Premium Cars Irbid',
    admin: 'Sara Ahmed',
    adminEmail: 'sara@premiumcars.jo',
    city: 'Irbid',
    address: 'University Street, Irbid',
    phone: '+962 2 987 6543',
    status: 'active',
    carsCount: 18,
    availableCars: 12,
    rentedCars: 5,
    maintenanceCars: 1,
    carCategories: [
      { name: 'Economy', total: 6, available: 4, rented: 2 },
      { name: 'Compact', total: 7, available: 5, rented: 2 },
      { name: 'SUV', total: 5, available: 3, rented: 1 }
    ],
    bookingsCount: 89,
    monthlyRevenue: 15920,
    rating: 4.6,
    joinDate: '2023-09-20',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c4d5c?w=400&h=300&fit=crop',
    lastActive: '2024-01-19T15:45:00Z',
    totalDistance: 198000
  },
  {
    id: '3',
    name: 'City Drive Zarqa',
    admin: 'Omar Hassan',
    adminEmail: 'omar@citydrive.jo',
    city: 'Zarqa',
    address: 'King Abdullah Street, Zarqa',
    phone: '+962 5 555 1234',
    status: 'suspended',
    carsCount: 15,
    availableCars: 10,
    rentedCars: 3,
    maintenanceCars: 2,
    carCategories: [
      { name: 'Economy', total: 7, available: 5, rented: 2 },
      { name: 'Compact', total: 5, available: 3, rented: 1 },
      { name: 'SUV', total: 3, available: 2, rented: 0 }
    ],
    bookingsCount: 45,
    monthlyRevenue: 8640,
    rating: 3.9,
    joinDate: '2023-07-10',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    lastActive: '2024-01-18T09:20:00Z',
    totalDistance: 125000
  },
  {
    id: '4',
    name: 'Luxury Fleet Aqaba',
    admin: 'Fatima Khoury',
    adminEmail: 'fatima@luxuryfleet.jo',
    city: 'Aqaba',
    address: 'Red Sea Mall, Aqaba',
    phone: '+962 3 444 7890',
    status: 'pending',
    carsCount: 12,
    availableCars: 11,
    rentedCars: 1,
    maintenanceCars: 0,
    carCategories: [
      { name: 'Luxury', total: 8, available: 7, rented: 1 },
      { name: 'SUV', total: 4, available: 4, rented: 0 }
    ],
    bookingsCount: 8,
    monthlyRevenue: 3200,
    rating: 4.2,
    joinDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop',
    lastActive: '2024-01-19T12:15:00Z',
    totalDistance: 12000
  },
  {
    id: '5',
    name: 'Desert Wheels Salt',
    admin: 'Tariq Al-Masri',
    adminEmail: 'tariq@desertwheels.jo',
    city: 'Salt',
    address: 'Prince Hassan Street, Salt',
    phone: '+962 5 333 2211',
    status: 'active',
    carsCount: 22,
    availableCars: 14,
    rentedCars: 7,
    maintenanceCars: 1,
    carCategories: [
      { name: 'Economy', total: 9, available: 6, rented: 3 },
      { name: 'Compact', total: 8, available: 5, rented: 3 },
      { name: 'SUV', total: 5, available: 3, rented: 1 }
    ],
    bookingsCount: 72,
    monthlyRevenue: 13450,
    rating: 4.5,
    joinDate: '2023-10-05',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    lastActive: '2024-01-20T08:15:00Z',
    totalDistance: 176000
  },
  {
    id: '6',
    name: 'Royal Rentals Madaba',
    admin: 'Layla Mansour',
    adminEmail: 'layla@royalrentals.jo',
    city: 'Madaba',
    address: 'Mosaic City Center, Madaba',
    phone: '+962 5 666 7788',
    status: 'active',
    carsCount: 16,
    availableCars: 11,
    rentedCars: 4,
    maintenanceCars: 1,
    carCategories: [
      { name: 'Economy', total: 5, available: 4, rented: 1 },
      { name: 'Compact', total: 6, available: 4, rented: 2 },
      { name: 'SUV', total: 5, available: 3, rented: 1 }
    ],
    bookingsCount: 54,
    monthlyRevenue: 10890,
    rating: 4.4,
    joinDate: '2023-11-12',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c4d5c?w=400&h=300&fit=crop',
    lastActive: '2024-01-19T16:30:00Z',
    totalDistance: 98000
  },
  {
    id: '7',
    name: 'Heritage Cars Jerash',
    admin: 'Nabil Qasem',
    adminEmail: 'nabil@heritagecars.jo',
    city: 'Jerash',
    address: 'Roman Theatre Area, Jerash',
    phone: '+962 2 777 8899',
    status: 'active',
    carsCount: 14,
    availableCars: 9,
    rentedCars: 4,
    maintenanceCars: 1,
    carCategories: [
      { name: 'Economy', total: 6, available: 4, rented: 2 },
      { name: 'Compact', total: 5, available: 3, rented: 2 },
      { name: 'SUV', total: 3, available: 2, rented: 0 }
    ],
    bookingsCount: 38,
    monthlyRevenue: 7920,
    rating: 4.3,
    joinDate: '2023-12-01',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    lastActive: '2024-01-20T11:45:00Z',
    totalDistance: 67000
  },
  {
    id: '8',
    name: 'North Star Rentals Mafraq',
    admin: 'Rashid Al-Zoubi',
    adminEmail: 'rashid@northstar.jo',
    city: 'Mafraq',
    address: 'Highway 10, Mafraq',
    phone: '+962 2 888 9900',
    status: 'active',
    carsCount: 12,
    availableCars: 8,
    rentedCars: 3,
    maintenanceCars: 1,
    carCategories: [
      { name: 'Economy', total: 5, available: 3, rented: 2 },
      { name: 'Compact', total: 4, available: 3, rented: 1 },
      { name: 'SUV', total: 3, available: 2, rented: 0 }
    ],
    bookingsCount: 31,
    monthlyRevenue: 6540,
    rating: 4.1,
    joinDate: '2024-01-08',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop',
    lastActive: '2024-01-19T14:20:00Z',
    totalDistance: 45000
  }
];

// Extensive Admin Data
export const admins: Admin[] = [
  {
    id: '1',
    name: 'Mohammed Al-Rashid',
    email: 'mohammed@elitecar.jo',
    phone: '+962 79 123 4567',
    storeName: 'Elite Car Rental Amman',
    storeId: '1',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-20T10:30:00',
    joinDate: '2023-08-15',
    permissions: ['manage_cars', 'manage_bookings', 'view_analytics', 'manage_customers'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Sara Ahmed',
    email: 'sara@premiumcars.jo',
    phone: '+962 77 987 6543',
    storeName: 'Premium Cars Irbid',
    storeId: '2',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-19T16:45:00',
    joinDate: '2023-09-20',
    permissions: ['manage_cars', 'manage_bookings', 'view_analytics'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Omar Hassan',
    email: 'omar@citydrive.jo',
    phone: '+962 78 555 1234',
    storeName: 'City Drive Zarqa',
    storeId: '3',
    role: 'admin',
    status: 'suspended',
    lastLogin: '2024-01-18T09:15:00',
    joinDate: '2023-07-10',
    permissions: ['manage_cars', 'view_analytics'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Fatima Khoury',
    email: 'fatima@luxuryfleet.jo',
    phone: '+962 76 444 7890',
    storeName: 'Luxury Fleet Aqaba',
    storeId: '4',
    role: 'admin',
    status: 'pending',
    lastLogin: 'Never',
    joinDate: '2024-01-15',
    permissions: ['manage_cars', 'manage_bookings'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Tariq Al-Masri',
    email: 'tariq@desertwheels.jo',
    phone: '+962 77 333 2211',
    storeName: 'Desert Wheels Salt',
    storeId: '5',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-20T08:15:00',
    joinDate: '2023-10-05',
    permissions: ['manage_cars', 'manage_bookings', 'view_analytics'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Layla Mansour',
    email: 'layla@royalrentals.jo',
    phone: '+962 76 666 7788',
    storeName: 'Royal Rentals Madaba',
    storeId: '6',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-19T16:30:00',
    joinDate: '2023-11-12',
    permissions: ['manage_cars', 'manage_bookings', 'view_analytics'],
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Nabil Qasem',
    email: 'nabil@heritagecars.jo',
    phone: '+962 78 777 8899',
    storeName: 'Heritage Cars Jerash',
    storeId: '7',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-20T11:45:00',
    joinDate: '2023-12-01',
    permissions: ['manage_cars', 'manage_bookings', 'view_analytics'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Rashid Al-Zoubi',
    email: 'rashid@northstar.jo',
    phone: '+962 77 888 9900',
    storeName: 'North Star Rentals Mafraq',
    storeId: '8',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-19T14:20:00',
    joinDate: '2024-01-08',
    permissions: ['manage_cars', 'manage_bookings'],
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face'
  }
];

// Extensive Review Data
export const reviews: Review[] = [
  {
    id: '1',
    customerName: 'Ahmed Mohammed',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    storeName: 'Elite Car Rental Amman',
    carName: 'Toyota Camry 2024',
    rating: 5,
    reviewText: 'Excellent service! The car was clean and well-maintained. Staff was very professional and helpful throughout the rental period. Highly recommend!',
    date: '2024-01-14T10:30:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '2',
    customerName: 'Sara Al-Zahra',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    storeName: 'Premium Cars Irbid',
    carName: 'Honda CR-V 2024',
    rating: 2,
    reviewText: 'Car had mechanical issues and the staff was very rude. Would not recommend this place to anyone. Waste of money and time!',
    date: '2024-01-13T15:45:00',
    status: 'flagged',
    flagCount: 3,
    flagReasons: ['inappropriate_language', 'spam', 'false_information']
  },
  {
    id: '3',
    customerName: 'Omar Hassan',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    storeName: 'City Drive Zarqa',
    carName: 'BMW 3 Series 2024',
    rating: 4,
    reviewText: 'Good experience overall. Car was as expected but pickup process took longer than anticipated. Would use again.',
    date: '2024-01-12T09:20:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '4',
    customerName: 'Fatima Khoury',
    customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    storeName: 'Luxury Fleet Aqaba',
    carName: 'Nissan Altima 2024',
    rating: 1,
    reviewText: 'TERRIBLE EXPERIENCE!!! SCAM ALERT!!! DO NOT USE THIS PLACE!!! THEY STEAL YOUR MONEY!!!',
    date: '2024-01-11T14:10:00',
    status: 'pending',
    flagCount: 5,
    flagReasons: ['inappropriate_language', 'spam', 'harassment']
  },
  {
    id: '5',
    customerName: 'Yousef Mahmoud',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    storeName: 'Elite Car Rental Amman',
    carName: 'Mercedes-Benz C-Class 2024',
    rating: 5,
    reviewText: 'Absolutely fantastic! The luxury car was in pristine condition. Perfect for my business meetings. Will definitely rent again.',
    date: '2024-01-10T11:00:00',
    status: 'published',
    flagCount: 0,
    flagReasons: [],
    adminResponse: 'Thank you for your positive feedback! We look forward to serving you again.'
  },
  {
    id: '6',
    customerName: 'Layla Abdullah',
    customerAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    storeName: 'Desert Wheels Salt',
    carName: 'Hyundai Tucson 2024',
    rating: 4,
    reviewText: 'Great value for money. The SUV was spacious and comfortable for our family trip. Minor issue with GPS but staff resolved it quickly.',
    date: '2024-01-09T16:45:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '7',
    customerName: 'Khaled Youssef',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    storeName: 'Premium Cars Irbid',
    carName: 'Toyota RAV4 2024',
    rating: 5,
    reviewText: 'Smooth rental process from start to finish. Car was delivered on time and in excellent condition. Very satisfied!',
    date: '2024-01-08T09:30:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '8',
    customerName: 'Noor Faisal',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    storeName: 'Royal Rentals Madaba',
    carName: 'Kia Sportage 2024',
    rating: 3,
    reviewText: 'Average experience. Car was okay but could have been cleaner. Staff was friendly though.',
    date: '2024-01-07T14:20:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '9',
    customerName: 'Ibrahim Tariq',
    customerAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
    storeName: 'Heritage Cars Jerash',
    carName: 'Nissan X-Trail 2024',
    rating: 5,
    reviewText: 'Perfect for our archaeological tour! The 7-seater was spacious and comfortable. Excellent service and competitive pricing.',
    date: '2024-01-06T10:15:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '10',
    customerName: 'Rania Jamal',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    storeName: 'Elite Car Rental Amman',
    carName: 'BMW 5 Series 2024',
    rating: 5,
    reviewText: 'Exceptional luxury experience! The BMW was immaculate and the service was top-notch. Worth every dinar!',
    date: '2024-01-05T15:50:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '11',
    customerName: 'Hassan Ali',
    customerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face',
    storeName: 'Desert Wheels Salt',
    carName: 'Volkswagen Passat 2024',
    rating: 4,
    reviewText: 'Solid car with good fuel efficiency. Pleasant rental experience. Would recommend to friends.',
    date: '2024-01-04T12:35:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '12',
    customerName: 'Mariam Zaid',
    customerAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    storeName: 'City Drive Zarqa',
    carName: 'Kia Rio 2024',
    rating: 3,
    reviewText: 'Budget-friendly option but nothing special. Car worked fine for short trips around the city.',
    date: '2024-01-03T08:25:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '13',
    customerName: 'Tariq Nabil',
    customerAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
    storeName: 'Luxury Fleet Aqaba',
    carName: 'Lexus ES 2024',
    rating: 5,
    reviewText: 'Amazing luxury sedan! Made our Aqaba vacation extra special. The comfort level is unmatched. Highly recommend!',
    date: '2024-01-02T17:10:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '14',
    customerName: 'Dina Waleed',
    customerAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
    storeName: 'Premium Cars Irbid',
    carName: 'Honda Accord 2024',
    rating: 4,
    reviewText: 'Very good car with all modern features. Delivery was prompt and staff was courteous. Minor scratches noticed but overall satisfied.',
    date: '2024-01-01T13:40:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  },
  {
    id: '15',
    customerName: 'Sami Rashid',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    storeName: 'North Star Rentals Mafraq',
    carName: 'Toyota Yaris 2024',
    rating: 4,
    reviewText: 'Great little car for solo travel. Good fuel economy and easy to park. Would rent again for short trips.',
    date: '2023-12-31T10:05:00',
    status: 'published',
    flagCount: 0,
    flagReasons: []
  }
];
