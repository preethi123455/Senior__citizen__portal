import React, { useState, useEffect } from 'react';
import './Cart.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'; // React Router v6

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (product, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBuyNow = () => {
    navigate('/checkout', { state: { cart } }); // Navigate and pass cart data as state
  };

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

  return (
    <div>
      <Navbar />
      <section id="Cart">
        <h2>Shopping Cart</h2>
        <div className="cart-container">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Price: {formatAsINR(formatPrice(item.price))}</p>
                  <div className="quantity-control">
                    <button
                      className="decrease-quantity"
                      onClick={() =>
                        handleQuantityChange(item, Math.max((item.quantity || 1) - 1, 1))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      className="increase-quantity"
                      onClick={() => handleQuantityChange(item, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button className="remove-item" onClick={() => handleRemoveFromCart(item)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        {cart.length > 0 && (
          <div className="buy-now-container">
            <div className="total-price">
              <p>Total Price: {formatAsINR(totalPrice)}</p>
            </div>
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;