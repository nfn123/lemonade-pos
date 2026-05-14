import React, { useState, useEffect } from 'react';
import './KitchenDisplay.css';

const KitchenDisplay = ({ locationId }) => {
  const [orders, setOrders] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [filters, setFilters] = useState('all'); // all, pending, completed

  useEffect(() => {
    // Fetch orders every 2 seconds
    const interval = setInterval(fetchOrders, 2000);
    fetchOrders();
    return () => clearInterval(interval);
  }, [locationId]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders?locationId=${locationId}`);
      const data = await response.json();
      setOrders(data.orders);
      const completed = data.orders.filter(o => o.status === 'completed').length;
      setCompletedCount(completed);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const markComplete = async (orderId) => {
    try {
      await fetch(`/api/orders/${orderId}/complete`, {
        method: 'PATCH'
      });
      fetchOrders();
    } catch (error) {
      console.error('Error marking order complete:', error);
    }
  };

  const getFilteredOrders = () => {
    switch (filters) {
      case 'pending':
        return orders.filter(o => o.status === 'pending');
      case 'completed':
        return orders.filter(o => o.status === 'completed');
      default:
        return orders;
    }
  };

  const filteredOrders = getFilteredOrders();
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="kitchen-container">
      <div className="kitchen-header">
        <h1>🍋 Kitchen Display System</h1>
        <p>Location: {locationId}</p>
      </div>

      <div className="kitchen-stats">
        <div className="stat-box">
          <span className="stat-label">Pending Orders</span>
          <span className="stat-value pending">{pendingCount}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Completed Today</span>
          <span className="stat-value completed">{completedCount}</span>
        </div>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filters === 'all' ? 'active' : ''}`}
          onClick={() => setFilters('all')}
        >
          All Orders
        </button>
        <button
          className={`filter-btn ${filters === 'pending' ? 'active' : ''}`}
          onClick={() => setFilters('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filters === 'completed' ? 'active' : ''}`}
          onClick={() => setFilters('completed')}
        >
          Completed
        </button>
      </div>

      <div className="orders-grid">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">✓ All caught up!</div>
        ) : (
          filteredOrders.map(order => (
            <div
              key={order.id}
              className={`order-card ${order.status}`}
            >
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status-badge ${order.status}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <p><strong>{item.fruit}</strong></p>
                    <p>{item.size.charAt(0).toUpperCase() + item.size.slice(1)} Cup</p>
                    {item.chocolateChips && <p>+ Chocolate Chips</p>}
                  </div>
                ))}
              </div>

              <div className="order-time">
                <small>Order time: {new Date(order.createdAt).toLocaleTimeString()}</small>
              </div>

              {order.status === 'pending' && (
                <button
                  className="complete-btn"
                  onClick={() => markComplete(order.id)}
                >
                  ✓ Mark Complete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KitchenDisplay;
