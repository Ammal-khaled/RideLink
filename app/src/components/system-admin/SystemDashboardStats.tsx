import React from 'react';
import { Store, Users, Star, DollarSign, TrendingUp, Activity, AlertTriangle, CheckCircle, CheckSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function SystemDashboardStats() {
  const platformStats = [
    {
      title: 'Total Stores',
      value: '47',
      change: '+3 this month',
      icon: Store,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Admins',
      value: '52',
      change: '+7 this week',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Platform Revenue',
      value: '156,420 JOD',
      change: '+18% from last month',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Growth Rate',
      value: '32%',
      change: 'Year over year',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentStores = [
    {
      id: '1',
      name: 'Elite Car Rental Amman',
      admin: 'Mohammed Al-Rashid',
      city: 'Amman',
      status: 'pending',
      revenue: '12,340 JOD',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Premium Cars Irbid',
      admin: 'Sara Ahmed',
      city: 'Irbid',
      status: 'active',
      revenue: '8,920 JOD',
      joinDate: '2024-01-10'
    },
    {
      id: '3',
      name: 'City Drive Zarqa',
      admin: 'Omar Hassan',
      city: 'Zarqa',
      status: 'suspended',
      revenue: '5,640 JOD',
      joinDate: '2024-01-08'
    },
    {
      id: '4',
      name: 'Luxury Fleet Aqaba',
      admin: 'Fatima Khoury',
      city: 'Aqaba',
      status: 'active',
      revenue: '15,280 JOD',
      joinDate: '2024-01-05'
    }
  ];

  const systemAlerts = [
    {
      id: '1',
      type: 'warning',
      title: 'Store Approval Pending',
      message: '3 stores waiting for approval',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'error',
      title: 'Admin Access Issue',
      message: 'Login failures detected for Elite Cars',
      time: '4 hours ago'
    },
    {
      id: '3',
      type: 'info',
      title: 'Review Reports',
      message: '15 reviews flagged for moderation',
      time: '6 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'info': return Activity;
      default: return CheckCircle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          System Dashboard
        </h1>
        <p className="text-muted-foreground">Platform-wide overview and management</p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-card rounded-card border-l-4 border-l-purple-500">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Stores */}
        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="w-5 h-5 text-purple-600" />
              Recent Stores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStores.map((store) => (
                <div key={store.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-purple-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <Store className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-muted-foreground">{store.admin} • {store.city}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(store.status)}>
                      {store.status}
                    </Badge>
                    <p className="text-sm font-medium">{store.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert) => {
                const AlertIcon = getAlertIcon(alert.type);
                return (
                  <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-xl">
                    <div className={`w-8 h-8 rounded-full ${getAlertColor(alert.type)} flex items-center justify-center flex-shrink-0`}>
                      <AlertIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card rounded-card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-purple-200 text-center">
              <CheckSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-800">Review Pending Stores</p>
              <p className="text-sm text-purple-600">3 stores waiting</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-purple-200 text-center">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-800">Moderate Reviews</p>
              <p className="text-sm text-purple-600">15 flagged reviews</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-purple-200 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-800">Manage Admins</p>
              <p className="text-sm text-purple-600">52 active admins</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}