#!/bin/bash

echo "🍋 Starting Lemonade POS System..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Docker is not running. Please start Docker first."
  exit 1
fi

# Build and start containers
echo "Building and starting containers..."
docker-compose up -d

echo ""
echo "✅ Lemonade POS System is running!"
echo ""
echo "Services:"
echo "  🎨 Frontend:  http://localhost:3000"
echo "  🔌 Backend:   http://localhost:5000"
echo "  🗄️  Database:  localhost:27017"
echo ""
echo "Default Credentials:"
echo "  Admin Email: admin@lemonade.com"
echo "  Admin Password: admin123"
echo ""
echo "Commands:"
echo "  View logs:    docker-compose logs -f"
echo "  Stop:         docker-compose down"
echo "  Restart:      docker-compose restart"
