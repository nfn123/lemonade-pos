import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('locations');
  const [locations, setLocations] = useState([]);
  const [staff, setStaff] = useState([]);
  const [pricingRequests, setPricingRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newLocationForm, setNewLocationForm] = useState({ name: '', address: '' });
  const [newStaffForm, setNewStaffForm] = useState({ username: '', email: '', role: 'cashier', locationId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [locRes, staffRes, pricingRes, ordersRes] = await Promise.all([
        fetch('/api/locations'),
        fetch('/api/staff'),
        fetch('/api/pricing-requests'),
        fetch('/api/orders')
      ]);

      if (locRes.ok) setLocations(await locRes.json());
      if (staffRes.ok) setStaff(await staffRes.json());
      if (pricingRes.ok) setPricingRequests(await pricingRes.json());
      if (ordersRes.ok) setOrders(await ordersRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createLocation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLocationForm)
      });
      if (response.ok) {
        fetchData();
        setNewLocationForm({ name: '', address: '' });
      }
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  const createStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaffForm)
      });
      if (response.ok) {
        fetchData();
        setNewStaffForm({ username: '', email: '', role: 'cashier', locationId: '' });
      }
    } catch (error) {
      console.error('Error creating staff:', error);
    }
  };

  const approvePricingRequest = async (requestId) => {
    try {
      await fetch(`/api/pricing-requests/${requestId}/approve`, {
        method: 'PATCH'
      });
      fetchData();
    } catch (error) {
      console.error('Error approving pricing request:', error);
    }
  };

  const rejectPricingRequest = async (requestId) => {
    try {
      await fetch(`/api/pricing-requests/${requestId}/reject`, {
        method: 'PATCH'
      });
      fetchData();
    } catch (error) {
      console.error('Error rejecting pricing request:', error);
    }
  };

  const getTotalSales = () => {
    return orders.reduce((sum, order) => sum + order.total, 0).toFixed(2);
  };

  const getTotalOrders = () => {
    return orders.filter(o => o.status === 'completed').length;
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🍋 Admin Dashboard</h1>
        <p>Manage all locations, staff, and pricing</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Locations</h3>
          <p className="stat-number">{locations.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Staff</h3>
          <p className="stat-number">{staff.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{getTotalOrders()}</p>
        </div>
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p className="stat-number">${getTotalSales()}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending Price Requests</h3>
          <p className="stat-number">{pricingRequests.filter(r => r.status === 'pending').length}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'locations' ? 'active' : ''}`}
          onClick={() => setActiveTab('locations')}
        >
          📍 Locations
        </button>
        <button
          className={`tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
        >
          👥 Staff
        </button>
        <button
          className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setActiveTab('pricing')}
        >
          💰 Pricing Requests
        </button>
        <button
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          📊 Reports
        </button>
      </div>

      {/* Locations Tab */}
      {activeTab === 'locations' && (
        <div className="tab-content">
          <h2>Manage Locations</h2>
          
          <form className="form-section" onSubmit={createLocation}>
            <h3>Add New Location</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Location Name"
                value={newLocationForm.name}
                onChange={(e) => setNewLocationForm({...newLocationForm, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Address"
                value={newLocationForm.address}
                onChange={(e) => setNewLocationForm({...newLocationForm, address: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Create Location</button>
          </form>

          <div className="list-section">
            <h3>Existing Locations</h3>
            {locations.map(loc => (
              <div key={loc.id} className="list-item">
                <div className="item-info">
                  <h4>{loc.name}</h4>
                  <p>{loc.address}</p>
                </div>
                <div className="item-meta">
                  <span className="badge">Setup: {loc.setupCompleted ? '✓' : 'Pending'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Tab */}
      {activeTab === 'staff' && (
        <div className="tab-content">
          <h2>Manage Staff</h2>
          
          <form className="form-section" onSubmit={createStaff}>
            <h3>Add New Staff Member</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={newStaffForm.username}
                onChange={(e) => setNewStaffForm({...newStaffForm, username: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={newStaffForm.email}
                onChange={(e) => setNewStaffForm({...newStaffForm, email: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <select
                value={newStaffForm.role}
                onChange={(e) => setNewStaffForm({...newStaffForm, role: e.target.value})}
              >
                <option value="cashier">Cashier</option>
                <option value="kitchen">Kitchen</option>
              </select>
            </div>
            <div className="form-group">
              <select
                value={newStaffForm.locationId}
                onChange={(e) => setNewStaffForm({...newStaffForm, locationId: e.target.value})}
                required
              >
                <option value="">Select Location</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-btn">Add Staff Member</button>
          </form>

          <div className="list-section">
            <h3>Staff Members</h3>
            {staff.map(member => (
              <div key={member.id} className="list-item">
                <div className="item-info">
                  <h4>{member.username}</h4>
                  <p>{member.email}</p>
                </div>
                <div className="item-meta">
                  <span className="badge">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing Requests Tab */}
      {activeTab === 'pricing' && (
        <div className="tab-content">
          <h2>Pricing Requests</h2>
          <div className="list-section">
            {pricingRequests.length === 0 ? (
              <p>No pricing requests</p>
            ) : (
              pricingRequests.map(req => (
                <div key={req.id} className={`list-item pricing-item ${req.status}`}>
                  <div className="item-info">
                    <h4>Location: {req.locationId}</h4>
                    <p><strong>Old Price:</strong> ${req.oldPrice} → <strong>New Price:</strong> ${req.newPrice}</p>
                    <p>Reason: {req.reason}</p>
                  </div>
                  <div className="item-meta">
                    {req.status === 'pending' && (
                      <>
                        <button
                          className="btn-approve"
                          onClick={() => approvePricingRequest(req.id)}
                        >
                          ✓ Approve
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => rejectPricingRequest(req.id)}
                        >
                          ✕ Reject
                        </button>
                      </>
                    )}
                    {req.status !== 'pending' && (
                      <span className="badge">{req.status.toUpperCase()}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="tab-content">
          <h2>Reports & Analytics</h2>
          <div className="reports-grid">
            <div className="report-card">
              <h3>Sales Summary</h3>
              <p className="report-value">${getTotalSales()}</p>
              <p className="report-label">Total Revenue</p>
            </div>
            <div className="report-card">
              <h3>Order Summary</h3>
              <p className="report-value">{getTotalOrders()}</p>
              <p className="report-label">Completed Orders</p>
            </div>
            <div className="report-card">
              <h3>Average Order Value</h3>
              <p className="report-value">${getTotalOrders() > 0 ? (getTotalSales() / getTotalOrders()).toFixed(2) : '0.00'}</p>
              <p className="report-label">Per Order</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
