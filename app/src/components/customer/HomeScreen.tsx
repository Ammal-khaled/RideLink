import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { Car } from '../CustomerApp';

interface HomeScreenProps {
  cars: Car[];
  onCarSelect: (car: Car) => void;
}

export function HomeScreen({ cars, onCarSelect }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = ['all', ...Array.from(new Set(cars.map(car => car.city)))];
  
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'all' || car.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <h1 className="text-xl font-bold">RideLink</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl"
          />
        </div>
        
        {/* City Filter */}
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-xl">
            <MapPin className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.slice(1).map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Car Listings */}
      <div className="flex-1 p-4 bg-secondary overflow-y-auto">
        <div className="space-y-4">
          {filteredCars.map(car => (
            <Card key={car.id} className="shadow-card rounded-card overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-lg text-sm font-medium">
                    {car.pricePerDay} JOD/day
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{car.name}</h3>
                  <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{car.city}</span>
                  </div>
                  
                  <Button 
                    onClick={() => onCarSelect(car)}
                    className="w-full bg-primary hover:bg-primary/90 rounded-xl"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredCars.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No cars found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}