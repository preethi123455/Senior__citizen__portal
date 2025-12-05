import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed

const OrderForm = ({ cart, clearCart }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const totalPrice = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      items: cart,
      totalPrice,
      customerName,
      customerEmail,
      customerAddress,
    };

    setLoading(true);
    try {
      const response = await axios.post('/api/orders', orderData); // Update the URL to your backend API endpoint
      console.log(response.data); // Handle success response
      clearCart(); // Clear the cart after order is placed
    } catch (error) {
      setErrorMessage('Failed to place the order, please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-form-container">
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default OrderForm;
