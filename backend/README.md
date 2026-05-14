# Lemonade POS System - Backend

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/lemonade-pos
JWT_SECRET=your-secret-key
PORT=5000
```

3. Start the server:
```bash
npm run dev
```

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Locations
- `GET /api/locations` - Get all locations
- `POST /api/locations` - Create location
- `GET /api/locations/:id` - Get location details
- `PUT /api/locations/:id` - Update location
- `GET /api/locations/:id/fruits` - Get available fruits

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/complete` - Mark order complete

### Staff
- `GET /api/staff` - Get all staff
- `POST /api/staff` - Create staff member
- `GET /api/staff/location/:locationId` - Get staff by location

### Pricing
- `GET /api/pricing` - Get all pricing requests
- `POST /api/pricing` - Create pricing request
- `PATCH /api/pricing/:id/approve` - Approve request
- `PATCH /api/pricing/:id/reject` - Reject request

## Features

✅ User authentication with JWT
✅ Multi-location support
✅ Order management
✅ Staff management
✅ Pricing request workflow
✅ Admin approval system
