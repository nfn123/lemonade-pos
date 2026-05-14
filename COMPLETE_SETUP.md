# Lemonade POS System - Complete Setup

## Quick Start (Docker)

### Prerequisites
- Docker & Docker Compose installed
- Port 3000, 5000, 27017 available

### Start Everything

```bash
# Make start script executable
chmod +x start.sh

# Run everything
./start.sh
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Database**: localhost:27017

### Stop
```bash
docker-compose down
```

---

## Manual Setup (No Docker)

### Prerequisites
- Node.js 18+
- MongoDB running locally

### Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/lemonade-pos
JWT_SECRET=lemonade-secret-key-2026
PORT=5000" > .env

# Start backend
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Seed Database
```bash
cd backend
node seed.js
```

---

## Default Test Credentials

### Admin
- Email: `admin@lemonade.com`
- Password: `admin123`
- Role: Full access to admin dashboard

### Cashier
- Email: `cashier@lemonade.com`
- Password: `cashier123`
- Role: POS interface access

### Kitchen
- Email: `kitchen@lemonade.com`
- Password: `kitchen123`
- Role: Kitchen display system

---

## Features Implemented

✅ **Multi-Location Support**
- Create and manage multiple locations
- Location-specific settings and inventory
- Test location pre-configured

✅ **User Management**
- Role-based access (Admin, Cashier, Kitchen)
- JWT authentication
- Secure password hashing

✅ **POS Interface (Cashier)**
- Fruit selection
- Size options (Mini $1.00, Regular $2.75)
- Topping options (Chocolate chips)
- Real-time cart
- Order submission

✅ **Kitchen Display System**
- Live order queue (updates every 2 seconds)
- Order status tracking
- Mark orders complete
- Filter by status

✅ **Admin Dashboard**
- **Locations Tab**: Create & manage locations
- **Staff Tab**: Add staff members to locations
- **Pricing Tab**: Approve/reject price change requests
- **Reports Tab**: Sales analytics, order metrics

✅ **Pricing Workflow**
- Staff request price changes
- Admin approval/rejection with reasoning
- Location-specific pricing adjustments
- Price history tracking

✅ **Order Management**
- Create orders with multiple items
- Real-time order status updates
- Sales tracking and analytics
- Order history

---

## Project Structure

```
lemonade-pos/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Location.js
│   │   ├── Order.js
│   │   └── PricingRequest.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── locations.js
│   │   ├── orders.js
│   │   ├── staff.js
│   │   └── pricing.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── cashier/
│   │   │   │   └── POS.jsx
│   │   │   ├── kitchen/
│   │   │   │   └── KitchenDisplay.jsx
│   │   │   └── admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── Dockerfile
├── config/
│   └── setupQuestions.js
├── data/
│   └── testLocation.json
├── docker-compose.yml
├── start.sh
└── README.md
```

---

## API Endpoints

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

---

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/lemonade-pos
JWT_SECRET=your-secret-key-here
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## Testing the System

### 1. Login as Admin
- Visit http://localhost:3000
- Use Admin credentials
- Access: Locations, Staff, Pricing, Reports

### 2. Create a new location (Admin)
- Go to Locations tab
- Fill in name and address
- Click Create Location

### 3. Add staff (Admin)
- Go to Staff tab
- Select location
- Add cashier or kitchen staff

### 4. Take an order (Cashier)
- Login as cashier
- Select fruit and size
- Add to cart
- Submit order

### 5. Complete orders (Kitchen)
- Login as kitchen staff
- See pending orders
- Mark as complete when done

### 6. Request price change (Cashier)
- Request price adjustment (via pricing endpoint)

### 7. Approve pricing (Admin)
- Go to Pricing Requests tab
- Review request
- Approve or reject

---

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
docker ps

# If using local MongoDB
mongo # or mongod --dbpath /path/to/data
```

### Port Already in Use
```bash
# Change port in docker-compose.yml or .env
# Example: 3001:3000 for frontend
```

### Backend Connection Error from Frontend
```bash
# Check REACT_APP_API_URL in frontend .env
# Ensure backend is running on correct port
```

---

## Next Steps / Future Enhancements

- [ ] Payment integration (Stripe/Square)
- [ ] Customer loyalty program
- [ ] Inventory management
- [ ] Real-time notifications
- [ ] Mobile app
- [ ] Advanced analytics & reporting
- [ ] Schedule management for staff
- [ ] Marketing & promotional campaigns
- [ ] QR code ordering
- [ ] Multi-language support
