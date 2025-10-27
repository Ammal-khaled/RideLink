# RideLink Mock Data

This directory contains comprehensive dummy data for the RideLink car rental application.

## File Structure

- **mockData.ts** - Centralized mock data file containing all dummy data used throughout the application

## Data Categories

### Cars (22 vehicles)
- **Economy Cars** (4): Budget-friendly options like Toyota Yaris, Hyundai Accent, Kia Rio, Nissan Sunny
- **Compact Cars** (5): Mid-range sedans including Toyota Camry, Honda Accord, Nissan Altima, Mazda 6, VW Passat
- **SUVs** (6): Family vehicles like Honda CR-V, Toyota RAV4, Hyundai Tucson, Nissan X-Trail, Mazda CX-5, Kia Sportage
- **Luxury Cars** (7): Premium vehicles including BMW 3/5 Series, Mercedes-Benz C/E-Class, Audi A4, Lexus ES, Genesis G80

Each car includes:
- Pricing (25-115 JOD/day)
- City location
- Deposit requirements
- Delivery time estimates
- Full descriptions and features
- Vehicle specifications (transmission, fuel type, seats, mileage)
- Status (available, rented, maintenance)

### Bookings (20 entries)
Diverse booking scenarios including:
- Various statuses: pending, confirmed, completed, rejected, cancelled
- Payment methods: cash, eFAWATEERcom, card
- Delivery options and pickup times
- Different rental durations (2-7 days)
- Customer contact information
- Special notes and requirements

### Stores (8 locations)
Rental stores across Jordan:
- **Cities**: Amman, Irbid, Zarqa, Aqaba, Salt, Madaba, Jerash, Mafraq
- **Statuses**: Active, pending, suspended
- Fleet composition and availability
- Revenue and booking statistics
- Admin information
- Performance metrics (ratings, total distance, last active)

### Admins (8 users)
Shop administrators managing stores:
- Full contact information
- Role-based permissions
- Activity tracking (last login, join date)
- Associated store assignments
- Avatar images

### Reviews (15 entries)
Customer feedback including:
- Rating scale (1-5 stars)
- Review text and date
- Status management (published, flagged, hidden, pending)
- Flag reasons for moderation
- Admin responses
- Customer avatars

### Cities (12 locations)
All major cities in Jordan where rental services are available.

## Usage

Import the data in your components:

```typescript
import { cars, bookings, stores, admins, reviews, cities } from '../data/mockData';
```

Or import specific types:

```typescript
import { type Car, type Booking, type Store } from '../data/mockData';
```

## Data Relationships

- **Cars** → linked to **Cities** (city field)
- **Bookings** → reference **Cars** (carName) and **Cities** (city)
- **Stores** → located in **Cities** and have **CarCategories**
- **Admins** → manage **Stores** (storeId)
- **Reviews** → reference **Stores** (storeName) and **Cars** (carName)

## Future Integration

This mock data structure is designed to easily transition to Firebase collections:
- Each array represents a potential Firestore collection
- ID fields are ready for document references
- Nested objects (like carCategories) can become subcollections
- All timestamps are in ISO format for easy conversion

## Adding New Data

When adding new mock entries, ensure:
1. Unique IDs for each entry
2. Consistent naming conventions
3. Valid status values
4. Proper data types matching TypeScript interfaces
5. Realistic dates and values
6. Proper relationships between entities
