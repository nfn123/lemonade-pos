#!/bin/bash

echo "🍋 Seeding database with test data..."

# Wait for MongoDB to be ready
sleep 5

node << 'EOF'
const mongoose = require('mongoose');
const User = require('./models/User');
const Location = require('./models/Location');
const Order = require('./models/Order');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/lemonade-pos');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Location.deleteMany({});
    await Order.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create test location
    const testLocation = new Location({
      name: 'Test Location',
      address: '123 Demo Street, Test City',
      isTestLocation: true,
      pricing: { mini: 1.00, regular: 2.75 },
      availableFruits: ['Strawberry', 'Mango', 'Blueberry', 'Watermelon'],
      hasChocolateChips: true,
      setupCompleted: true,
      setupCompletedAt: new Date()
    });
    await testLocation.save();
    console.log('✅ Created test location');

    // Create admin user
    const adminSalt = await bcrypt.genSalt(10);
    const adminUser = new User({
      username: 'admin',
      email: 'admin@lemonade.com',
      password: await bcrypt.hash('admin123', adminSalt),
      role: 'admin'
    });
    await adminUser.save();
    console.log('✅ Created admin user');

    // Create cashier user
    const cashierSalt = await bcrypt.genSalt(10);
    const cashierUser = new User({
      username: 'cashier1',
      email: 'cashier@lemonade.com',
      password: await bcrypt.hash('cashier123', cashierSalt),
      role: 'cashier',
      locationId: testLocation._id
    });
    await cashierUser.save();
    console.log('✅ Created cashier user');

    // Create kitchen user
    const kitchenSalt = await bcrypt.genSalt(10);
    const kitchenUser = new User({
      username: 'kitchen1',
      email: 'kitchen@lemonade.com',
      password: await bcrypt.hash('kitchen123', kitchenSalt),
      role: 'kitchen',
      locationId: testLocation._id
    });
    await kitchenUser.save();
    console.log('✅ Created kitchen user');

    // Create sample orders
    const orders = [
      {
        locationId: testLocation._id,
        items: [
          { fruit: 'Strawberry', size: 'mini', chocolateChips: false, price: 1.00 }
        ],
        total: 1.00,
        status: 'completed',
        completedAt: new Date()
      },
      {
        locationId: testLocation._id,
        items: [
          { fruit: 'Mango', size: 'regular', chocolateChips: true, price: 2.75 }
        ],
        total: 2.75,
        status: 'completed',
        completedAt: new Date()
      },
      {
        locationId: testLocation._id,
        items: [
          { fruit: 'Blueberry', size: 'mini', chocolateChips: false, price: 1.00 },
          { fruit: 'Watermelon', size: 'regular', chocolateChips: false, price: 2.75 }
        ],
        total: 3.75,
        status: 'pending'
      }
    ];

    await Order.insertMany(orders);
    console.log('✅ Created sample orders');

    console.log('\n🎉 Database seeding completed!');
    console.log('\nTest Credentials:');
    console.log('  Admin:    admin@lemonade.com / admin123');
    console.log('  Cashier:  cashier@lemonade.com / cashier123');
    console.log('  Kitchen:  kitchen@lemonade.com / kitchen123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
EOF
