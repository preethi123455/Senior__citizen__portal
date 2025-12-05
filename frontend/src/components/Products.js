import React from 'react';

const Product = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;