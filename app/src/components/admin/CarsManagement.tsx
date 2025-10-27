import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Car {
  id: string;
  name: string;
  city: string;
  pricePerDay: number;
  description: string;
  image: string;
  status: 'available' | 'rented' | 'maintenance';
}

export function CarsManagement() {
  const [cars, setCars] = useState<Car[]>([
    {
      id: '1',
      name: 'Toyota Camry 2024',
      city: 'Amman',
      pricePerDay: 45,
      description: 'Comfortable sedan perfect for business trips and family outings.',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      status: 'available'
    },
    {
      id: '2',
      name: 'Honda CR-V 2024',
      city: 'Irbid',
      pricePerDay: 65,
      description: 'Spacious SUV ideal for family trips and adventures.',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      status: 'rented'
    },
    {
      id: '3',
      name: 'BMW 3 Series 2024',
      city: 'Amman',
      pricePerDay: 85,
      description: 'Luxury sedan with premium features and exceptional performance.',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
      status: 'available'
    },
    {
      id: '4',
      name: 'Nissan Altima 2024',
      city: 'Zarqa',
      pricePerDay: 40,
      description: 'Reliable and economical sedan with modern features.',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
      status: 'maintenance'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    pricePerDay: '',
    description: '',
    image: ''
  });

  const cities = ['Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Salt'];

  const handleAddCar = () => {
    const newCar: Car = {
      id: Date.now().toString(),
      name: formData.name,
      city: formData.city,
      pricePerDay: Number(formData.pricePerDay),
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
      status: 'available'
    };
    
    setCars(prev => [...prev, newCar]);
    setFormData({ name: '', city: '', pricePerDay: '', description: '', image: '' });
    setIsAddDialogOpen(false);
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      city: car.city,
      pricePerDay: car.pricePerDay.toString(),
      description: car.description,
      image: car.image
    });
  };

  const handleUpdateCar = () => {
    if (!editingCar) return;
    
    setCars(prev => prev.map(car => 
      car.id === editingCar.id 
        ? {
            ...car,
            name: formData.name,
            city: formData.city,
            pricePerDay: Number(formData.pricePerDay),
            description: formData.description,
            image: formData.image
          }
        : car
    ));
    
    setEditingCar(null);
    setFormData({ name: '', city: '', pricePerDay: '', description: '', image: '' });
  };

  const handleDeleteCar = (carId: string) => {
    if (confirm('Are you sure you want to delete this car?')) {
      setCars(prev => prev.filter(car => car.id !== carId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Cars Management</h1>
          <p className="text-muted-foreground">Manage your fleet of rental vehicles</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90 rounded-xl">
              <Plus className="w-4 h-4" />
              Add Car
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Car</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Car Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Toyota Camry 2024"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Select value={formData.city} onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price per Day (JOD)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) => setFormData(prev => ({ ...prev, pricePerDay: e.target.value }))}
                  placeholder="45"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the car features and benefits"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="rounded-xl"
                />
              </div>
              <Button 
                onClick={handleAddCar}
                disabled={!formData.name || !formData.city || !formData.pricePerDay}
                className="w-full bg-primary hover:bg-primary/90 rounded-xl"
              >
                Add Car
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <Card key={car.id} className="shadow-card rounded-card overflow-hidden">
            <div className="relative">
              <ImageWithFallback
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <Badge className={`absolute top-3 right-3 ${getStatusColor(car.status)}`}>
                {car.status}
              </Badge>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2">{car.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{car.city}</span>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <DollarSign className="w-4 h-4" />
                  <span>{car.pricePerDay} JOD/day</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {car.description}
              </p>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditCar(car)}
                  className="flex-1 gap-2 rounded-xl"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCar(car.id)}
                  className="flex-1 gap-2 text-destructive hover:bg-destructive hover:text-white rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingCar} onOpenChange={() => setEditingCar(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Car</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Car Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="edit-city">City</Label>
              <Select value={formData.city} onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-price">Price per Day (JOD)</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.pricePerDay}
                onChange={(e) => setFormData(prev => ({ ...prev, pricePerDay: e.target.value }))}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="rounded-xl"
              />
            </div>
            <Button 
              onClick={handleUpdateCar}
              className="w-full bg-primary hover:bg-primary/90 rounded-xl"
            >
              Update Car
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}