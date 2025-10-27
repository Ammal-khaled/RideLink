import React from 'react';
import { CheckCircle, Calendar, Car, Phone, MapPin, DollarSign, Clock, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface BookingConfirmationProps {
  bookingData: any;
  onBackToHome: () => void;
}

export function BookingConfirmation({ bookingData, onBackToHome }: BookingConfirmationProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-screen bg-secondary">
      {/* Success Header */}
      <div className="bg-white text-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">Booking Submitted Successfully!</h1>
        <p className="text-muted-foreground">Your rental request has been received and is being processed.</p>
      </div>

      {/* Booking Details */}
      <div className="flex-1 p-4 space-y-4">
        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-5 h-5" />
              Vehicle Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Car</span>
              <span className="font-medium">{bookingData.car.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {bookingData.car.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily Rate</span>
              <span className="font-medium">{bookingData.car.pricePerDay} JOD</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Rental Period
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Start Date</span>
              <span className="font-medium">{formatDate(bookingData.startDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">End Date</span>
              <span className="font-medium">{formatDate(bookingData.endDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{bookingData.days} day(s)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{bookingData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{bookingData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment</span>
              <span className="font-medium capitalize">{bookingData.paymentMethod}</span>
            </div>
            {bookingData.delivery && bookingData.car.deliveryETA && (
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Delivery ETA
                </span>
                <span className="font-medium text-primary">{bookingData.car.deliveryETA}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card rounded-card bg-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Rental Cost ({bookingData.days} days)</span>
              <span>{bookingData.subtotal} JOD</span>
            </div>
            {bookingData.delivery && (
              <div className="flex justify-between">
                <span>Delivery Service</span>
                <span>{bookingData.deliveryFee} JOD</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-primary">{bookingData.total} JOD</span>
            </div>
            {bookingData.car.deposit && (
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-sm p-2 bg-white rounded-lg">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>
                    <span className="font-medium">Deposit: </span>
                    <span className="text-primary font-bold">{bookingData.car.deposit} JOD</span>
                    <span className="text-muted-foreground"> (paid at pickup)</span>
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-card rounded-card border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <h3 className="font-bold mb-3">What's Next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Our team will review your booking request</li>
              <li>• You'll receive a confirmation call within 24 hours</li>
              <li>• Payment will be processed upon vehicle pickup</li>
              <li>• Bring a valid driver's license and ID for pickup</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Back to Home Button */}
      <div className="p-4 bg-white border-t">
        <Button 
          onClick={onBackToHome}
          className="w-full bg-primary hover:bg-primary/90 text-lg py-3 rounded-xl"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}