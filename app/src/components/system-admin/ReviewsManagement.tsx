import React, { useState } from 'react';
import { Star, Flag, Trash2, CheckCircle, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  storeName: string;
  carName: string;
  rating: number;
  reviewText: string;
  date: string;
  status: 'published' | 'flagged' | 'hidden' | 'pending';
  flagCount: number;
  flagReasons: string[];
  adminResponse?: string;
}

export function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      customerName: 'Ahmed Mohammed',
      customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      storeName: 'Elite Car Rental Amman',
      carName: 'Toyota Camry 2024',
      rating: 5,
      reviewText: 'Excellent service! The car was clean and well-maintained. Staff was very professional and helpful throughout the rental period.',
      date: '2024-01-14T10:30:00',
      status: 'published',
      flagCount: 0,
      flagReasons: []
    },
    {
      id: '2',
      customerName: 'Sara Al-Zahra',
      customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      storeName: 'Premium Cars Irbid',
      carName: 'Honda CR-V 2024',
      rating: 2,
      reviewText: 'Car had mechanical issues and the staff was very rude. Would not recommend this place to anyone. Waste of money and time!',
      date: '2024-01-13T15:45:00',
      status: 'flagged',
      flagCount: 3,
      flagReasons: ['inappropriate_language', 'spam', 'false_information']
    },
    {
      id: '3',
      customerName: 'Omar Hassan',
      customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      storeName: 'City Drive Zarqa',
      carName: 'BMW 3 Series 2024',
      rating: 4,
      reviewText: 'Good experience overall. Car was as expected but pickup process took longer than anticipated. Would use again.',
      date: '2024-01-12T09:20:00',
      status: 'published',
      flagCount: 0,
      flagReasons: []
    },
    {
      id: '4',
      customerName: 'Fatima Khoury',
      customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      storeName: 'Luxury Fleet Aqaba',
      carName: 'Nissan Altima 2024',
      rating: 1,
      reviewText: 'TERRIBLE EXPERIENCE!!! SCAM ALERT!!! DO NOT USE THIS PLACE!!! THEY STEAL YOUR MONEY!!!',
      date: '2024-01-11T14:10:00',
      status: 'pending',
      flagCount: 5,
      flagReasons: ['inappropriate_language', 'spam', 'harassment']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [adminResponse, setAdminResponse] = useState('');

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.carName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleStatusChange = (reviewId: string, newStatus: 'published' | 'hidden') => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, status: newStatus } : review
    ));
  };

  const handleDeleteReview = (reviewId: string) => {
    if (confirm('Are you sure you want to permanently delete this review?')) {
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    }
  };

  const handleAddResponse = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, adminResponse } : review
    ));
    setAdminResponse('');
    setSelectedReview(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      case 'hidden': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return CheckCircle;
      case 'flagged': return Flag;
      case 'hidden': return Eye;
      case 'pending': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Reviews Management
        </h1>
        <p className="text-muted-foreground">Moderate and manage customer reviews across all stores</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search reviews, customers, or stores..."
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
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-48 rounded-xl">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Reviews', value: reviews.length, color: 'text-blue-600' },
          { label: 'Published', value: reviews.filter(r => r.status === 'published').length, color: 'text-green-600' },
          { label: 'Flagged', value: reviews.filter(r => r.status === 'flagged').length, color: 'text-red-600' },
          { label: 'Pending', value: reviews.filter(r => r.status === 'pending').length, color: 'text-yellow-600' },
          { label: 'Hidden', value: reviews.filter(r => r.status === 'hidden').length, color: 'text-gray-600' }
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

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(review => {
          const StatusIcon = getStatusIcon(review.status);
          
          return (
            <Card key={review.id} className="shadow-card rounded-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Customer Avatar */}
                  <Avatar className="w-12 h-12 flex-shrink-0">
                    <AvatarImage src={review.customerAvatar} alt={review.customerName} />
                    <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                  </Avatar>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold">{review.customerName}</h3>
                        <p className="text-sm text-muted-foreground">{review.storeName} • {review.carName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {review.flagCount > 0 && (
                          <Badge variant="destructive" className="gap-1">
                            <Flag className="w-3 h-3" />
                            {review.flagCount} flags
                          </Badge>
                        )}
                        <Badge className={getStatusColor(review.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {review.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.rating}/5 • {formatDate(review.date)}
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="mb-4 leading-relaxed">{review.reviewText}</p>

                    {/* Admin Response */}
                    {review.adminResponse && (
                      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4 rounded-r-xl">
                        <p className="text-sm font-medium text-purple-800 mb-1">Admin Response:</p>
                        <p className="text-purple-700">{review.adminResponse}</p>
                      </div>
                    )}

                    {/* Flag Reasons */}
                    {review.flagReasons.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-red-700 mb-2">Flagged for:</p>
                        <div className="flex flex-wrap gap-1">
                          {review.flagReasons.map((reason, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {reason.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedReview(review)}
                            className="gap-2 rounded-xl"
                          >
                            <Eye className="w-4 h-4" />
                            Respond
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add Admin Response</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Original Review:</p>
                              <p className="text-sm bg-gray-50 p-3 rounded-xl">{review.reviewText}</p>
                            </div>
                            <div>
                              <Textarea
                                placeholder="Write your response to this review..."
                                value={adminResponse}
                                onChange={(e) => setAdminResponse(e.target.value)}
                                className="rounded-xl"
                                rows={4}
                              />
                            </div>
                            <Button 
                              onClick={() => handleAddResponse(review.id)}
                              disabled={!adminResponse.trim()}
                              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
                            >
                              Add Response
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {review.status === 'published' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(review.id, 'hidden')}
                          className="gap-2 text-orange-600 hover:bg-orange-50 rounded-xl"
                        >
                          <Eye className="w-4 h-4" />
                          Hide
                        </Button>
                      )}

                      {(review.status === 'hidden' || review.status === 'flagged' || review.status === 'pending') && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(review.id, 'published')}
                          className="gap-2 text-green-600 hover:bg-green-50 rounded-xl"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                        className="gap-2 text-destructive hover:bg-destructive hover:text-white rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <Card className="shadow-card rounded-card">
          <CardContent className="text-center py-12">
            <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No reviews found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}