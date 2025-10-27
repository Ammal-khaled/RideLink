import React, { useState } from 'react';
import { Calendar, CheckCircle, X, Clock, Phone, MapPin, Car } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  carName: string;
  city: string;
  startDate: string;
  endDate: string;
  days: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed';
  paymentMethod: string;
  delivery: boolean;
}

export function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      customerName: 'Ahmed Mohammed',
      customerPhone: '+962 79 123 4567',
      carName: 'Toyota Camry 2024',
      city: 'Amman',
      startDate: '2024-01-15',
      endDate: '2024-01-21',
      days: 6,
      totalAmount: 270,
      status: 'pending',
      paymentMethod: 'cash',
      delivery: true
    },
    {
      id: '2',
      customerName: 'Sarah Al-Zahra',
      customerPhone: '+962 77 987 6543',
      carName: 'Honda CR-V 2024',
      city: 'Irbid',
      startDate: '2024-01-18',
      endDate: '2024-01-24',
      days: 6,
      totalAmount: 390,
      status: 'confirmed',
      paymentMethod: 'efawateercom',
      delivery: false
    },
    {
      id: '3',
      customerName: 'Omar Hassan',
      customerPhone: '+962 78 555 1234',
      carName: 'BMW 3 Series 2024',
      city: 'Amman',
      startDate: '2024-01-20',
      endDate: '2024-01-26',
      days: 6,
      totalAmount: 510,
      status: 'pending',
      paymentMethod: 'cash',
      delivery: true
    },
    {
      id: '4',
      customerName: 'Fatima Khoury',
      customerPhone: '+962 76 444 7890',
      carName: 'Nissan Altima 2024',
      city: 'Zarqa',
      startDate: '2024-01-10',
      endDate: '2024-01-15',
      days: 5,
      totalAmount: 200,
      status: 'completed',
      paymentMethod: 'cash',
      delivery: false
    }
  ]);

  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleStatusChange = (bookingId: string, newStatus: 'confirmed' | 'rejected') => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'confirmed': return CheckCircle;
      case 'rejected': return X;
      case 'completed': return CheckCircle;
      default: return Clock;
    }
  };

  const filteredBookings = statusFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === statusFilter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Bookings Management</h1>
          <p className="text-muted-foreground">Review and manage customer bookings</p>
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: bookings.length, color: 'bg-blue-100 text-blue-800' },
          { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'bg-green-100 text-green-800' },
          { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: 'bg-blue-100 text-blue-800' }
        ].map((stat, index) => (
          <Card key={index} className="shadow-card rounded-card">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold mb-1 ${stat.color.split(' ')[1]}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map(booking => {
          const StatusIcon = getStatusIcon(booking.status);
          
          return (
            <Card key={booking.id} className="shadow-card rounded-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${getStatusColor(booking.status)} flex items-center justify-center`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{booking.customerName}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Phone className="w-4 h-4" />
                        {booking.customerPhone}
                      </div>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle</p>
                      <p className="font-medium">{booking.carName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{booking.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rental Period</p>
                      <p className="font-medium">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
                      <p className="text-xs text-muted-foreground">{booking.days} days</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-bold text-lg text-primary">{booking.totalAmount} JOD</p>
                    <p className="text-xs text-muted-foreground capitalize">{booking.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {booking.delivery && (
                      <span className="bg-accent px-2 py-1 rounded-lg">
                        🚛 Delivery requested
                      </span>
                    )}
                  </div>
                  
                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(booking.id, 'rejected')}
                        className="gap-2 text-destructive hover:bg-destructive hover:text-white rounded-xl"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(booking.id, 'confirmed')}
                        className="gap-2 bg-green-600 hover:bg-green-700 rounded-xl"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBookings.length === 0 && (
        <Card className="shadow-card rounded-card">
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No bookings found for the selected filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}