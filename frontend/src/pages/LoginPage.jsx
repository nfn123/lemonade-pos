import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@lemonade.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user, data.token, data.user.locationId || 'test-loc-001');
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (error) {
      setError('Connection error. Is the backend running?');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (creds) => {
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🍋 Lemonade POS</h1>
          <p>Multi-Location Order Management System</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="quick-login">
          <p>Quick Login:</p>
          <div className="quick-buttons">
            <button
              type="button"
              onClick={() => quickLogin({ email: 'admin@lemonade.com', password: 'admin123' })}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => quickLogin({ email: 'cashier@lemonade.com', password: 'cashier123' })}
            >
              Cashier
            </button>
            <button
              type="button"
              onClick={() => quickLogin({ email: 'kitchen@lemonade.com', password: 'kitchen123' })}
            >
              Kitchen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
