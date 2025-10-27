import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, Eye, Ban, CheckCircle, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface AdminData {
  id: string;
  name: string;
  email: string;
  phone: string;
  storeName: string;
  storeId: string;
  role: 'admin' | 'super_admin';
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
  joinDate: string;
  permissions: string[];
  avatar: string;
}

export function AdminsManagement() {
  const [admins, setAdmins] = useState<AdminData[]>([
    {
      id: '1',
      name: 'Mohammed Al-Rashid',
      email: 'mohammed@elitecar.jo',
      phone: '+962 79 123 4567',
      storeName: 'Elite Car Rental Amman',
      storeId: '1',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00',
      joinDate: '2023-08-15',
      permissions: ['manage_cars', 'manage_bookings', 'view_analytics'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Sara Ahmed',
      email: 'sara@premiumcars.jo',
      phone: '+962 77 987 6543',
      storeName: 'Premium Cars Irbid',
      storeId: '2',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-14T16:45:00',
      joinDate: '2023-09-20',
      permissions: ['manage_cars', 'manage_bookings', 'view_analytics'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Omar Hassan',
      email: 'omar@citydrive.jo',
      phone: '+962 78 555 1234',
      storeName: 'City Drive Zarqa',
      storeId: '3',
      role: 'admin',
      status: 'suspended',
      lastLogin: '2024-01-10T09:15:00',
      joinDate: '2023-07-10',
      permissions: ['manage_cars', 'view_analytics'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Fatima Khoury',
      email: 'fatima@luxuryfleet.jo',
      phone: '+962 76 444 7890',
      storeName: 'Luxury Fleet Aqaba',
      storeId: '4',
      role: 'admin',
      status: 'pending',
      lastLogin: 'Never',
      joinDate: '2024-01-15',
      permissions: ['manage_cars', 'manage_bookings'],
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    storeId: '',
    role: 'admin' as 'admin' | 'super_admin'
  });

  const availableStores = [
    { id: '1', name: 'Elite Car Rental Amman' },
    { id: '2', name: 'Premium Cars Irbid' },
    { id: '3', name: 'City Drive Zarqa' },
    { id: '4', name: 'Luxury Fleet Aqaba' },
    { id: '5', name: 'New Store Pending' }
  ];

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         admin.storeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddAdmin = () => {
    const newAdmin: AdminData = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      storeName: availableStores.find(store => store.id === formData.storeId)?.name || '',
      storeId: formData.storeId,
      role: formData.role,
      status: 'pending',
      lastLogin: 'Never',
      joinDate: new Date().toISOString().split('T')[0],
      permissions: ['manage_cars', 'manage_bookings'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    };
    
    setAdmins(prev => [...prev, newAdmin]);
    setFormData({ name: '', email: '', phone: '', storeId: '', role: 'admin' });
    setIsAddDialogOpen(false);
  };

  const handleStatusChange = (adminId: string, newStatus: 'active' | 'suspended') => {
    setAdmins(prev => prev.map(admin => 
      admin.id === adminId ? { ...admin, status: newStatus } : admin
    ));
  };

  const handleDeleteAdmin = (adminId: string) => {
    if (confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
      setAdmins(prev => prev.filter(admin => admin.id !== adminId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastLogin = (lastLogin: string) => {
    if (lastLogin === 'Never') return 'Never';
    return new Date(lastLogin).toLocaleDateString() + ' at ' + new Date(lastLogin).toLocaleTimeString();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admins Management
          </h1>
          <p className="text-muted-foreground">Manage shop administrators and their permissions</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl">
              <Plus className="w-4 h-4" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@store.com"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+962 7X XXX XXXX"
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="store">Assign to Store</Label>
                <Select value={formData.storeId} onValueChange={(value) => setFormData(prev => ({ ...prev, storeId: value }))}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStores.map(store => (
                      <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value: 'admin' | 'super_admin') => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Store Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleAddAdmin}
                disabled={!formData.name || !formData.email || !formData.storeId}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
              >
                Create Admin
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search admins, emails, or stores..."
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
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Admins', value: admins.length, color: 'text-blue-600' },
          { label: 'Active', value: admins.filter(a => a.status === 'active').length, color: 'text-green-600' },
          { label: 'Pending', value: admins.filter(a => a.status === 'pending').length, color: 'text-yellow-600' },
          { label: 'Suspended', value: admins.filter(a => a.status === 'suspended').length, color: 'text-red-600' }
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

      {/* Admins List */}
      <div className="space-y-4">
        {filteredAdmins.map(admin => (
          <Card key={admin.id} className="shadow-card rounded-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <Avatar className="w-16 h-16">
                  <AvatarImage src={admin.avatar} alt={admin.name} />
                  <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                </Avatar>

                {/* Admin Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{admin.name}</h3>
                      <p className="text-muted-foreground">{admin.storeName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleColor(admin.role)}>
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Store Admin'}
                      </Badge>
                      <Badge className={getStatusColor(admin.status)}>
                        {admin.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{admin.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{admin.phone}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Login</p>
                      <p className="font-medium">{formatLastLogin(admin.lastLogin)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Permissions: {admin.permissions.join(', ')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Joined: {new Date(admin.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedAdmin(admin)}
                            className="gap-2 rounded-xl"
                          >
                            <Eye className="w-4 h-4" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Admin Details</DialogTitle>
                          </DialogHeader>
                          {selectedAdmin && (
                            <div className="space-y-4">
                              <div className="text-center">
                                <Avatar className="w-20 h-20 mx-auto mb-3">
                                  <AvatarImage src={selectedAdmin.avatar} alt={selectedAdmin.name} />
                                  <AvatarFallback>{selectedAdmin.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h3 className="font-bold text-lg">{selectedAdmin.name}</h3>
                                <p className="text-muted-foreground">{selectedAdmin.storeName}</p>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm text-muted-foreground">Contact Information</p>
                                  <p className="font-medium">{selectedAdmin.email}</p>
                                  <p className="font-medium">{selectedAdmin.phone}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Permissions</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {selectedAdmin.permissions.map((permission, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {permission.replace('_', ' ')}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {admin.status === 'active' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(admin.id, 'suspended')}
                          className="gap-2 text-orange-600 hover:bg-orange-50 rounded-xl"
                        >
                          <Ban className="w-4 h-4" />
                          Suspend
                        </Button>
                      )}

                      {admin.status === 'suspended' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(admin.id, 'active')}
                          className="gap-2 text-green-600 hover:bg-green-50 rounded-xl"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Activate
                        </Button>
                      )}

                      {admin.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(admin.id, 'active')}
                          className="gap-2 bg-green-600 hover:bg-green-700 rounded-xl"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAdmin(admin.id)}
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
        ))}
      </div>

      {filteredAdmins.length === 0 && (
        <Card className="shadow-card rounded-card">
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No admins found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}