import React, { useState } from 'react';
import { SplashScreen } from './customer/SplashScreen';
import { HomeScreen } from './customer/HomeScreen';
import { CarDetailsScreen } from './customer/CarDetailsScreen';
import { BookingScreen } from './customer/BookingScreen';
import { BookingConfirmation } from './customer/BookingConfirmation';

export type Car = {
  id: string;
  name: string;
  city: string;
  pricePerDay: number;
  image: string;
  description: string;
  deposit?: number; // Optional deposit amount in JOD
  deliveryETA?: string; // Estimated delivery time (e.g., "30-45 minutes")
};

export type Screen = 'splash' | 'home' | 'details' | 'booking' | 'confirmation';

export function CustomerApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  // Mock car data
  const cars: Car[] = [
    {
      id: '1',
      name: 'Toyota Camry 2024',
      city: 'Amman',
      pricePerDay: 45,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      description: 'Comfortable sedan perfect for business trips and family outings. Features automatic transmission, air conditioning, and modern safety features.',
      deposit: 50,
      deliveryETA: '30-45 minutes'
    },
    {
      id: '2',
      name: 'Honda CR-V 2024',
      city: 'Irbid',
      pricePerDay: 65,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      description: 'Spacious SUV ideal for family trips and adventures. All-wheel drive, premium interior, and excellent fuel efficiency.',
      deposit: 75,
      deliveryETA: '45-60 minutes'
    },
    {
      id: '3',
      name: 'BMW 3 Series 2024',
      city: 'Amman',
      pricePerDay: 85,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      description: 'Luxury sedan with premium features and exceptional performance. Perfect for special occasions and business meetings.',
      deposit: 150,
      deliveryETA: '30-45 minutes'
    },
    {
      id: '4',
      name: 'Nissan Altima 2024',
      city: 'Zarqa',
      pricePerDay: 40,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      description: 'Reliable and economical sedan with modern features. Great value for money with comfortable seating for 5 passengers.',
      deliveryETA: '60-90 minutes'
    }
  ];

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    setCurrentScreen('details');
  };

  const handleBookNow = () => {
    setCurrentScreen('booking');
  };

  const handleBookingSubmit = (data: any) => {
    setBookingData(data);
    setCurrentScreen('confirmation');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCar(null);
    setBookingData(null);
  };

  // Auto-advance from splash screen
  React.useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('home');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Mobile container styling
  const mobileContainer = "max-w-sm mx-auto bg-white min-h-screen shadow-xl";

  return (
    <div className="bg-gray-100 py-8">
      <div className={mobileContainer}>
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'home' && (
          <HomeScreen cars={cars} onCarSelect={handleCarSelect} />
        )}
        {currentScreen === 'details' && selectedCar && (
          <CarDetailsScreen 
            car={selectedCar} 
            onBookNow={handleBookNow}
            onBack={() => setCurrentScreen('home')}
          />
        )}
        {currentScreen === 'booking' && selectedCar && (
          <BookingScreen 
            car={selectedCar}
            onSubmit={handleBookingSubmit}
            onBack={() => setCurrentScreen('details')}
          />
        )}
        {currentScreen === 'confirmation' && bookingData && (
          <BookingConfirmation 
            bookingData={bookingData}
            onBackToHome={handleBackToHome}
          />
        )}
      </div>
    </div>
  );
}