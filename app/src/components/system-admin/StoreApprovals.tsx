import React, { useState } from 'react';
import { CheckSquare, CheckCircle, X, Eye, Clock, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface StoreApplication {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  description: string;
  businessLicense: string;
  taxId: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    businessLicense: string;
    taxCertificate: string;
    ownerID: string;
    storeFront: string;
  };
  businessPlan: string;
  expectedCars: number;
  investmentAmount: number;
}

export function StoreApprovals() {
  const [applications, setApplications] = useState<StoreApplication[]>([
    {
      id: '1',
      storeName: 'Royal Cars Rental',
      ownerName: 'Khalid Al-Mansouri',
      email: 'khalid@royalcars.jo',
      phone: '+962 79 888 9999',
      city: 'Amman',
      address: 'Sweifieh, Amman - Near City Mall',
      description: 'Premium car rental service focusing on luxury and business vehicles for the Amman market.',
      businessLicense: 'BL-2024-001',
      taxId: 'TAX-789456123',
      submissionDate: '2024-01-10T09:00:00',
      status: 'pending',
      documents: {
        businessLicense: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        taxCertificate: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        ownerID: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        storeFront: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
      },
      businessPlan: 'Focus on premium vehicles including BMW, Mercedes, and Audi. Target business professionals and tourists.',
      expectedCars: 12,
      investmentAmount: 250000
    },
    {
      id: '2',
      storeName: 'Budget Drive Solutions',
      ownerName: 'Nadia Hassan',
      email: 'nadia@budgetdrive.jo',
      phone: '+962 77 555 4444',
      city: 'Irbid',
      address: 'University Street, Irbid - Near Jordan University',
      description: 'Affordable car rental service for students and budget-conscious customers in Irbid.',
      businessLicense: 'BL-2024-002',
      taxId: 'TAX-456789123',
      submissionDate: '2024-01-12T14:30:00',
      status: 'pending',
      documents: {
        businessLicense: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        taxCertificate: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        ownerID: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        storeFront: 'https://images.unsplash.com/photo-1486312338219-ce68e2c4d5c6?w=400&h=300&fit=crop'
      },
      businessPlan: 'Economy vehicles targeting university students and young professionals. Competitive pricing strategy.',
      expectedCars: 8,
      investmentAmount: 120000
    },
    {
      id: '3',
      storeName: 'Desert Adventure Rentals',
      ownerName: 'Mohammed Al-Zahra',
      email: 'mohammed@desertadventure.jo',
      phone: '+962 76 222 3333',
      city: 'Aqaba',
      address: 'Tourism Street, Aqaba - Near Red Sea Mall',
      description: 'Specialized in 4WD and adventure vehicles for desert tours and off-road experiences.',
      businessLicense: 'BL-2024-003',
      taxId: 'TAX-123456789',
      submissionDate: '2024-01-15T11:15:00',
      status: 'pending',
      documents: {
        businessLicense: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        taxCertificate: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        ownerID: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        storeFront: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop'
      },
      businessPlan: 'Adventure tourism focus with 4WD vehicles, guided tours, and equipment rental packages.',
      expectedCars: 15,
      investmentAmount: 300000
    }
  ]);

  const [selectedApplication, setSelectedApplication] = useState<StoreApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  const handleApprove = (applicationId: string) => {
    if (confirm('Are you sure you want to approve this store application?')) {
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: 'approved' } : app
      ));
    }
  };

  const handleReject = (applicationId: string) => {
    if (rejectionReason.trim()) {
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: 'rejected' } : app
      ));
      setRejectionReason('');
      setShowRejectionDialog(false);
      setSelectedApplication(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'rejected': return X;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Store Approvals
        </h1>
        <p className="text-muted-foreground">Review and approve new store applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Applications', value: applications.length, color: 'text-blue-600' },
          { label: 'Pending Review', value: applications.filter(a => a.status === 'pending').length, color: 'text-yellow-600' },
          { label: 'Approved', value: applications.filter(a => a.status === 'approved').length, color: 'text-green-600' },
          { label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, color: 'text-red-600' }
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

      {/* Pending Applications Alert */}
      {pendingApplications.length > 0 && (
        <Card className="shadow-card rounded-card border-l-4 border-l-yellow-500 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">
                  {pendingApplications.length} application(s) awaiting your review
                </p>
                <p className="text-sm text-yellow-700">
                  Please review and approve/reject pending store applications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Applications List */}
      <div className="space-y-6">
        {applications.map(application => {
          const StatusIcon = getStatusIcon(application.status);
          
          return (
            <Card key={application.id} className="shadow-card rounded-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <CheckSquare className="w-6 h-6 text-purple-600" />
                    {application.storeName}
                  </CardTitle>
                  <Badge className={getStatusColor(application.status)}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {application.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-purple-800 mb-3">Owner Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Owner:</span>
                          <span>{application.ownerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-600" />
                          <span>{application.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-purple-600" />
                          <span>{application.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-purple-800 mb-3">Business Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span>{application.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">License:</span>
                          <span>{application.businessLicense}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Tax ID:</span>
                          <span>{application.taxId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address & Description */}
                <div>
                  <h4 className="font-medium text-purple-800 mb-2">Store Address</h4>
                  <p className="text-muted-foreground">{application.address}</p>
                </div>

                <div>
                  <h4 className="font-medium text-purple-800 mb-2">Business Description</h4>
                  <p className="text-muted-foreground">{application.description}</p>
                </div>

                {/* Business Plan & Investment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="font-medium text-purple-800">Expected Fleet Size</p>
                    <p className="text-2xl font-bold text-purple-600">{application.expectedCars} cars</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="font-medium text-blue-800">Investment Amount</p>
                    <p className="text-2xl font-bold text-blue-600">{application.investmentAmount.toLocaleString()} JOD</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="font-medium text-green-800">Application Date</p>
                    <p className="text-sm text-green-600">{formatDate(application.submissionDate)}</p>
                  </div>
                </div>

                {/* Business Plan */}
                <div>
                  <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Business Plan
                  </h4>
                  <p className="text-muted-foreground bg-gray-50 p-4 rounded-xl">{application.businessPlan}</p>
                </div>

                {/* Documents Preview */}
                <div>
                  <h4 className="font-medium text-purple-800 mb-3">Submitted Documents</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(application.documents).map(([docType, docUrl]) => (
                      <div key={docType} className="text-center">
                        <div className="w-full h-24 rounded-lg overflow-hidden mb-2 border">
                          <ImageWithFallback
                            src={docUrl}
                            alt={docType}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground capitalize">
                          {docType.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {application.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedApplication(application)}
                          className="gap-2 rounded-xl"
                        >
                          <Eye className="w-4 h-4" />
                          Review Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Application Review - {application.storeName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium">Complete Information?</p>
                              <p className="text-sm text-green-600">✓ All fields completed</p>
                            </div>
                            <div>
                              <p className="font-medium">Valid Documents?</p>
                              <p className="text-sm text-green-600">✓ All documents submitted</p>
                            </div>
                            <div>
                              <p className="font-medium">Business License Valid?</p>
                              <p className="text-sm text-yellow-600">⚠ Requires verification</p>
                            </div>
                            <div>
                              <p className="font-medium">Investment Adequate?</p>
                              <p className="text-sm text-green-600">✓ Sufficient investment</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      onClick={() => handleApprove(application.id)}
                      className="gap-2 bg-green-600 hover:bg-green-700 rounded-xl"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve Store
                    </Button>

                    <Dialog open={showRejectionDialog && selectedApplication?.id === application.id} onOpenChange={setShowRejectionDialog}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowRejectionDialog(true);
                          }}
                          className="gap-2 text-red-600 hover:bg-red-50 rounded-xl"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Reject Application</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Please provide a reason for rejecting this store application:
                          </p>
                          <Textarea
                            placeholder="Enter rejection reason..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="rounded-xl"
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowRejectionDialog(false);
                                setRejectionReason('');
                              }}
                              className="flex-1 rounded-xl"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleReject(application.id)}
                              disabled={!rejectionReason.trim()}
                              variant="destructive"
                              className="flex-1 rounded-xl"
                            >
                              Reject Application
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {application.status !== 'pending' && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Application {application.status} on {formatDate(application.submissionDate)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {applications.length === 0 && (
        <Card className="shadow-card rounded-card">
          <CardContent className="text-center py-12">
            <CheckSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No store applications found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}