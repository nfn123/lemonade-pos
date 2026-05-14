import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import POS from './pages/cashier/POS';
import KitchenDisplay from './pages/kitchen/KitchenDisplay';
import AdminDashboard from './pages/admin/AdminDashboard';
import './App.css';

function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [locationId, setLocationId] = React.useState(localStorage.getItem('locationId'));

  const handleLogin = (userData, authToken, locId) => {
    setUser(userData);
    setToken(authToken);
    setLocationId(locId);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('locationId', locId);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setLocationId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('locationId');
  };

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const userRole = user?.role || JSON.parse(localStorage.getItem('user'))?.role;

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-content">
            <h1>🍋 Lemonade POS</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        <Routes>
          {userRole === 'cashier' && (
            <Route path="/" element={<POS locationId={locationId} />} />
          )}
          {userRole === 'kitchen' && (
            <Route path="/" element={<KitchenDisplay locationId={locationId} />} />
          )}
          {userRole === 'admin' && (
            <Route path="/" element={<AdminDashboard />} />
          )}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
