import React, { useState, useEffect } from 'react';
import './POS.css';

const POS = ({ locationId }) => {
  const [fruits, setFruits] = useState([]);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [selectedSize, setSelectedSize] = useState('mini');
  const [hasChocolateChips, setHasChocolateChips] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);

  const PRICES = {
    mini: 1.00,
    regular: 2.75
  };

  useEffect(() => {
    // Fetch available fruits for location
    fetchLocationFruits();
  }, [locationId]);

  const fetchLocationFruits = async () => {
    try {
      const response = await fetch(`/api/locations/${locationId}/fruits`);
      const data = await response.json();
      setFruits(data.fruits);
    } catch (error) {
      console.error('Error fetching fruits:', error);
    }
  };

  const addToCart = () => {
    if (!selectedFruit) {
      alert('Please select a fruit');
      return;
    }

    const item = {
      id: Date.now(),
      fruit: selectedFruit,
      size: selectedSize,
      chocolateChips: hasChocolateChips,
      price: PRICES[selectedSize]
    };

    setCart([...cart, item]);
    calculateTotal([...cart, item]);
    resetSelection();
  };

  const removeFromCart = (itemId) => {
    const updated = cart.filter(item => item.id !== itemId);
    setCart(updated);
    calculateTotal(updated);
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum.toFixed(2));
  };

  const resetSelection = () => {
    setSelectedFruit(null);
    setSelectedSize('mini');
    setHasChocolateChips(false);
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId,
          items: cart,
          total
        })
      });

      if (response.ok) {
        setOrderComplete(true);
        setCart([]);
        setTotal(0);
        setTimeout(() => setOrderComplete(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order');
    }
  };

  return (
    <div className="pos-container">
      <div className="pos-header">
        <h1>🍋 Lemonade POS</h1>
        <p>Location: {locationId}</p>
      </div>

      <div className="pos-main">
        {/* Fruit Selection */}
        <div className="selection-panel">
          <h2>Select Fruit</h2>
          <div className="fruit-grid">
            {fruits.map(fruit => (
              <button
                key={fruit}
                className={`fruit-btn ${selectedFruit === fruit ? 'active' : ''}`}
                onClick={() => setSelectedFruit(fruit)}
              >
                {fruit}
              </button>
            ))}
          </div>

          {/* Size Selection */}
          <h2>Select Size</h2>
          <div className="size-buttons">
            <button
              className={`size-btn ${selectedSize === 'mini' ? 'active' : ''}`}
              onClick={() => setSelectedSize('mini')}
            >
              Mini - ${PRICES.mini.toFixed(2)}
            </button>
            <button
              className={`size-btn ${selectedSize === 'regular' ? 'active' : ''}`}
              onClick={() => setSelectedSize('regular')}
            >
              Regular - ${PRICES.regular.toFixed(2)}
            </button>
          </div>

          {/* Toppings */}
          <h2>Toppings</h2>
          <label className="topping-label">
            <input
              type="checkbox"
              checked={hasChocolateChips}
              onChange={(e) => setHasChocolateChips(e.target.checked)}
            />
            Chocolate Chips (+$0.50)
          </label>

          {/* Add to Cart Button */}
          <button className="add-to-cart-btn" onClick={addToCart}>
            + Add to Cart
          </button>
        </div>

        {/* Cart */}
        <div className="cart-panel">
          <h2>Order Summary</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-details">
                      <p><strong>{item.fruit}</strong></p>
                      <p>{item.size.charAt(0).toUpperCase() + item.size.slice(1)} Cup</p>
                      {item.chocolateChips && <p>+ Chocolate Chips</p>}
                    </div>
                    <div className="item-price">${item.price.toFixed(2)}</div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total: ${total}</h3>
              </div>

              <button className="submit-order-btn" onClick={submitOrder}>
                Submit Order
              </button>
            </>
          )}
        </div>
      </div>

      {orderComplete && (
        <div className="success-message">
          ✓ Order submitted successfully!
        </div>
      )}
    </div>
  );
};

export default POS;
