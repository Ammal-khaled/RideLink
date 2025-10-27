import React from 'react';
import { ArrowLeft, MapPin, DollarSign, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { Car } from '../CustomerApp';

interface CarDetailsScreenProps {
  car: Car;
  onBookNow: () => void;
  onBack: () => void;
}

export function CarDetailsScreen({ car, onBookNow, onBack }: CarDetailsScreenProps) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b flex items-center p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-3 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold text-lg">Car Details</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Car Image */}
        <div className="relative">
          <ImageWithFallback
            src={car.image}
            alt={car.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-2 rounded-lg font-bold">
            {car.pricePerDay} JOD/day
          </div>
        </div>

        {/* Car Info */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-3">{car.name}</h2>
          
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{car.city}</span>
          </div>

          <div className="flex items-center gap-2 mb-4 text-primary">
            <DollarSign className="w-5 h-5" />
            <span className="text-xl font-semibold">{car.pricePerDay} JOD per day</span>
          </div>

          {/* Deposit Information */}
          <div className="mb-6 p-4 bg-accent rounded-xl border border-primary/20">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {car.deposit ? (
                <span className="font-medium">
                  Deposit required: <span className="text-primary font-bold">{car.deposit} JOD</span> (paid at pickup)
                </span>
              ) : (
                <span className="font-medium text-green-600">
                  No deposit required
                </span>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {car.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Air Conditioning',
                'Automatic Transmission',
                'Bluetooth Connectivity',
                'GPS Navigation',
                'Safety Features',
                'Clean Interior'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="p-6 bg-white border-t">
        <Button 
          onClick={onBookNow}
          className="w-full bg-primary hover:bg-primary/90 text-lg py-3 rounded-xl"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
