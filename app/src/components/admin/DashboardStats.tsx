import React from 'react';
import { Car, Calendar, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function DashboardStats() {
  const stats = [
    {
      title: 'Total Cars',
      value: '24',
      change: '+2 this month',
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Bookings',
      value: '18',
      change: '+5 this week',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Monthly Revenue',
      value: '3,240 JOD',
      change: '+12% from last month',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Growth Rate',
      value: '24%',
      change: 'Year over year',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentBookings = [
    {
      id: '1',
      customer: 'Ahmed Mohammed',
      car: 'Toyota Camry 2024',
      date: '2024-01-15',
      status: 'confirmed',
      amount: '270 JOD'
    },
    {
      id: '2',
      customer: 'Sarah Al-Zahra',
      car: 'Honda CR-V 2024',
      date: '2024-01-14',
      status: 'pending',
      amount: '390 JOD'
    },
    {
      id: '3',
      customer: 'Omar Hassan',
      car: 'BMW 3 Series 2024',
      date: '2024-01-13',
      status: 'confirmed',
      amount: '510 JOD'
    },
    {
      id: '4',
      customer: 'Fatima Khoury',
      car: 'Nissan Altima 2024',
      date: '2024-01-12',
      status: 'completed',
      amount: '200 JOD'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return Clock;
      case 'completed': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your car rental business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card rounded-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <Card className="shadow-card rounded-card">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => {
              const StatusIcon = getStatusIcon(booking.status);
              return (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${getStatusColor(booking.status)} flex items-center justify-center`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.customer}</p>
                      <p className="text-sm text-muted-foreground">{booking.car}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{booking.amount}</p>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}