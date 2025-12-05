import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
import './Checkout.css';

const Checkout = () => {
  const { state } = useLocation(); // Get the cart data passed from Cart
  const cart = state ? state.cart : [];
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^0-9.-]+/g, ''));
    }
    return price;
  };

  const formatAsINR = (price) => {
    const numericPrice = parseFloat(price);
    if (!isNaN(numericPrice)) {
      return `₹${numericPrice.toFixed(2)}`;
    }
    return `₹0.00`;
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + formatPrice(item.price) * (item.quantity || 1),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      items: cart,
      totalPrice,
      customerName,
      customerEmail,
      customerAddress,
    };

    try {
      // Send POST request to backend to place the order
      const response = await axios.post('http://localhost:2000/orders/place-order', orderData);
      console.log(response.data);
      alert('Order placed successfully!');
      setLoading(false);
      // Optionally, you can redirect to another page (e.g., a success page)
    } catch (err) {
      setError('Failed to place the order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div className="checkout-container">
        <h3>Order Summary</h3>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <h4>{item.name}</h4>
              <p>Price: {formatAsINR(formatPrice(item.price))}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
        <div className="total-price">
          <p>Total Price: {formatAsINR(totalPrice)}</p>
        </div>

        <h3>Customer Details</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="customerName">Name:</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="customerEmail">Email:</label>
            <input
              type="email"
              id="customerEmail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="customerAddress">Address:</label>
            <textarea
              id="customerAddress"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Confirm Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
