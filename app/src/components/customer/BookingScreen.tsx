import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Phone, Truck, CreditCard, Clock, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { Car } from '../CustomerApp';

interface BookingScreenProps {
  car: Car;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export function BookingScreen({ car, onSubmit, onBack }: BookingScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    startDate: '',
    endDate: '',
    delivery: false,
    paymentMethod: 'cash'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate days and total
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const subtotal = days * car.pricePerDay;
    const deliveryFee = formData.delivery ? 5 : 0;
    const total = subtotal + deliveryFee;

    const bookingData = {
      ...formData,
      car,
      days,
      subtotal,
      deliveryFee,
      total
    };

    onSubmit(bookingData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate summary
  const calculateSummary = () => {
    if (!formData.startDate || !formData.endDate) return null;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return null;
    
    const subtotal = days * car.pricePerDay;
    const deliveryFee = formData.delivery ? 5 : 0;
    const total = subtotal + deliveryFee;

    return { days, subtotal, deliveryFee, total };
  };

  const summary = calculateSummary();

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
        <h1 className="font-bold text-lg">Book {car.name}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-secondary">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card className="shadow-card rounded-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="rounded-xl"
                  placeholder="+962 7X XXX XXXX"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Rental Dates */}
          <Card className="shadow-card rounded-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Rental Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="rounded-xl"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="rounded-xl"
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Options */}
          <Card className="shadow-card rounded-card">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Delivery Service</p>
                    <p className="text-sm text-muted-foreground">+ 5 JOD</p>
                  </div>
                </div>
                <Switch
                  checked={formData.delivery}
                  onCheckedChange={(checked) => handleInputChange('delivery', checked)}
                />
              </div>

              {/* Show ETA when delivery is enabled */}
              {formData.delivery && car.deliveryETA && (
                <div className="p-3 bg-accent rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">
                      Estimated delivery time: <span className="text-primary">{car.deliveryETA}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Deposit Information */}
              <div className="p-3 bg-accent rounded-lg border border-primary/20">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
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
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="shadow-card rounded-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="efawateercom">eFAWATEERcom</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Summary */}
          {summary && (
            <Card className="shadow-card rounded-card bg-accent">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>{summary.days} day(s) × {car.pricePerDay} JOD</span>
                  <span>{summary.subtotal} JOD</span>
                </div>
                {formData.delivery && (
                  <div className="flex justify-between">
                    <span>Delivery Service</span>
                    <span>{summary.deliveryFee} JOD</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{summary.total} JOD</span>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>

      {/* Confirm Button */}
      <div className="p-4 bg-white border-t">
        <Button 
          onClick={handleSubmit}
          disabled={!summary || !formData.fullName || !formData.phone}
          className="w-full bg-primary hover:bg-primary/90 text-lg py-3 rounded-xl"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}