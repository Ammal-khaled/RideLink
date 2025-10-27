import React, { useState } from 'react';
import { Store, Edit, Trash2, MapPin, Users, DollarSign, Eye, Ban, CheckCircle, Car, Calendar, Fuel, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CarCategory {
  name: string;
  total: number;
  available: number;
  rented: number;
}

interface StoreData {
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

export function StoresManagement() {
  const [stores, setStores] = useState<StoreData[]>([
    {
      id: '1',
      name: 'Elite Car Rental Amman',
      admin: 'Mohammed Al-Rashid',
      adminEmail: 'mohammed@elitecar.jo',
      city: 'Amman',
      address: 'Al-Abdali, Downtown Amman',
      phone: '+962 6 123 4567',
      status: 'active',
      carsCount: 15,
      availableCars: 9,
      rentedCars: 5,
      maintenanceCars: 1,
      carCategories: [
        { name: 'Economy', total: 6, available: 4, rented: 2 },
        { name: 'Compact', total: 4, available: 2, rented: 2 },
        { name: 'SUV', total: 3, available: 2, rented: 1 },
        { name: 'Luxury', total: 2, available: 1, rented: 0 }
      ],
      bookingsCount: 42,
      monthlyRevenue: 12340,
      rating: 4.8,
      joinDate: '2023-08-15',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      lastActive: '2024-01-20T10:30:00Z',
      totalDistance: 145000
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
      carsCount: 8,
      availableCars: 6,
      rentedCars: 2,
      maintenanceCars: 0,
      carCategories: [
        { name: 'Economy', total: 3, available: 2, rented: 1 },
        { name: 'Compact', total: 3, available: 3, rented: 0 },
        { name: 'SUV', total: 2, available: 1, rented: 1 }
      ],
      bookingsCount: 28,
      monthlyRevenue: 8920,
      rating: 4.6,
      joinDate: '2023-09-20',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c4d5c?w=400&h=300&fit=crop',
      lastActive: '2024-01-19T15:45:00Z',
      totalDistance: 89000
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
      carsCount: 12,
      availableCars: 8,
      rentedCars: 2,
      maintenanceCars: 2,
      carCategories: [
        { name: 'Economy', total: 5, available: 4, rented: 1 },
        { name: 'Compact', total: 4, available: 2, rented: 1 },
        { name: 'SUV', total: 3, available: 2, rented: 0 }
      ],
      bookingsCount: 18,
      monthlyRevenue: 5640,
      rating: 3.9,
      joinDate: '2023-07-10',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      lastActive: '2024-01-18T09:20:00Z',
      totalDistance: 67000
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
      carsCount: 6,
      availableCars: 6,
      rentedCars: 0,
      maintenanceCars: 0,
      carCategories: [
        { name: 'Luxury', total: 4, available: 4, rented: 0 },
        { name: 'SUV', total: 2, available: 2, rented: 0 }
      ],
      bookingsCount: 0,
      monthlyRevenue: 0,
      rating: 0,
      joinDate: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop',
      lastActive: '2024-01-19T12:15:00Z',
      totalDistance: 0
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.admin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (storeId: string, newStatus: 'active' | 'suspended' | 'rejected') => {
    setStores(prev => prev.map(store => 
      store.id === storeId ? { ...store, status: newStatus } : store
    ));
  };

  const handleDeleteStore = (storeId: string) => {
    if (confirm('Are you sure you want to permanently delete this store? This action cannot be undone.')) {
      setStores(prev => prev.filter(store => store.id !== storeId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Eye;
      case 'suspended': return Ban;
      case 'rejected': return Trash2;
      default: return Eye;
    }
  };

  const getAvailabilityPercentage = (available: number, total: number) => {
    return total > 0 ? (available / total) * 100 : 0;
  };

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Stores Management
          </h1>
          <p className="text-muted-foreground">Manage and monitor all stores on the platform</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search stores or admins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Stores', value: stores.length, color: 'text-blue-600' },
          { label: 'Active', value: stores.filter(s => s.status === 'active').length, color: 'text-green-600' },
          { label: 'Pending Approval', value: stores.filter(s => s.status === 'pending').length, color: 'text-yellow-600' },
          { label: 'Suspended', value: stores.filter(s => s.status === 'suspended').length, color: 'text-red-600' },
          { label: 'Total Cars', value: stores.reduce((sum, s) => sum + s.carsCount, 0), color: 'text-purple-600' }
        ].map((stat, index) => (
          <Card key={index} className="shadow-card rounded-card">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stores List */}
      <div className="space-y-4">
        {filteredStores.map(store => {
          const StatusIcon = getStatusIcon(store.status);
          const availabilityPercentage = getAvailabilityPercentage(store.availableCars, store.carsCount);
          
          return (
            <Card key={store.id} className="shadow-card rounded-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Store Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Store Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-xl mb-1">{store.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {store.admin}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {store.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatLastActive(store.lastActive)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(store.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {store.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Car Availability Section */}
                    <div className="mb-4 p-4 bg-gradient-blue-subtle rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-primary flex items-center gap-2">
                          <Car className="w-4 h-4" />
                          Fleet Overview ({store.carsCount} cars)
                        </h4>
                        <div className="text-sm text-muted-foreground">
                          {availabilityPercentage.toFixed(0)}% Available
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{store.availableCars}</div>
                          <div className="text-xs text-muted-foreground">Available</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{store.rentedCars}</div>
                          <div className="text-xs text-muted-foreground">Rented</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">{store.maintenanceCars}</div>
                          <div className="text-xs text-muted-foreground">Maintenance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{store.totalDistance.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Total KM</div>
                        </div>
                      </div>

                      <Progress value={availabilityPercentage} className="h-2 mb-3" />

                      {/* Car Categories */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {store.carCategories.map((category, index) => (
                          <div key={index} className="bg-white rounded-lg p-2 text-center">
                            <div className="text-xs font-medium text-primary">{category.name}</div>
                            <div className="text-sm">
                              <span className="font-bold text-green-600">{category.available}</span>
                              <span className="text-muted-foreground">/{category.total}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Bookings</p>
                        <p className="font-semibold">{store.bookingsCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                        <p className="font-semibold">{store.monthlyRevenue.toLocaleString()} JOD</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-semibold">
                          {store.rating > 0 ? `${store.rating} ⭐` : 'No ratings yet'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Joined: {new Date(store.joinDate).toLocaleDateString()}
                      </p>
                      
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedStore(store)}
                              className="gap-2 rounded-xl"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Store Details - {store.name}</DialogTitle>
                            </DialogHeader>
                            {selectedStore && (
                              <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Admin Name</p>
                                    <p className="font-medium">{selectedStore.admin}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{selectedStore.adminEmail}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-medium">{selectedStore.phone}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Address</p>
                                    <p className="font-medium">{selectedStore.address}</p>
                                  </div>
                                </div>

                                {/* Detailed Fleet Information */}
                                <div className="bg-gradient-blue-subtle rounded-xl p-4">
                                  <h4 className="font-semibold text-primary mb-4">Detailed Fleet Information</h4>
                                  
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <Card>
                                      <CardContent className="p-3 text-center">
                                        <div className="text-2xl font-bold text-green-600">{selectedStore.availableCars}</div>
                                        <div className="text-sm text-muted-foreground">Available Cars</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="p-3 text-center">
                                        <div className="text-2xl font-bold text-blue-600">{selectedStore.rentedCars}</div>
                                        <div className="text-sm text-muted-foreground">Currently Rented</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="p-3 text-center">
                                        <div className="text-2xl font-bold text-orange-600">{selectedStore.maintenanceCars}</div>
                                        <div className="text-sm text-muted-foreground">In Maintenance</div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="p-3 text-center">
                                        <div className="text-2xl font-bold text-purple-600">{selectedStore.carsCount}</div>
                                        <div className="text-sm text-muted-foreground">Total Fleet</div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  <div>
                                    <h5 className="font-medium mb-3">Fleet by Category</h5>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                      {selectedStore.carCategories.map((category, index) => (
                                        <div key={index} className="bg-white rounded-lg p-3">
                                          <div className="font-medium text-primary mb-2">{category.name}</div>
                                          <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                              <span>Total:</span>
                                              <span className="font-semibold">{category.total}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Available:</span>
                                              <span className="font-semibold text-green-600">{category.available}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Rented:</span>
                                              <span className="font-semibold text-blue-600">{category.rented}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                              <div 
                                                className="bg-green-600 h-1.5 rounded-full" 
                                                style={{ width: `${(category.available / category.total) * 100}%` }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                
                                <Alert>
                                  <AlertDescription>
                                    Store has been operating since {new Date(selectedStore.joinDate).toLocaleDateString()} 
                                    with {selectedStore.carsCount} vehicles and {selectedStore.bookingsCount} total bookings.
                                    Fleet utilization rate: {((selectedStore.rentedCars / selectedStore.carsCount) * 100).toFixed(1)}%
                                  </AlertDescription>
                                </Alert>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {store.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(store.id, 'active')}
                              className="gap-2 bg-green-600 hover:bg-green-700 rounded-xl"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(store.id, 'rejected')}
                              className="gap-2 text-red-600 hover:bg-red-50 rounded-xl"
                            >
                              <Trash2 className="w-4 h-4" />
                              Reject
                            </Button>
                          </>
                        )}

                        {store.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(store.id, 'suspended')}
                            className="gap-2 text-orange-600 hover:bg-orange-50 rounded-xl"
                          >
                            <Ban className="w-4 h-4" />
                            Suspend
                          </Button>
                        )}

                        {store.status === 'suspended' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(store.id, 'active')}
                            className="gap-2 text-green-600 hover:bg-green-50 rounded-xl"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Reactivate
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteStore(store.id)}
                          className="gap-2 text-destructive hover:bg-destructive hover:text-white rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStores.length === 0 && (
        <Card className="shadow-card rounded-card">
          <CardContent className="text-center py-12">
            <Store className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No stores found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}