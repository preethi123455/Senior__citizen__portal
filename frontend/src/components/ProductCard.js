import React, { useState } from 'react';
import ProductCard from './ProductCard';

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log('Cart updated:', cart); // Debugging purpose
  };

  const products = [
    {
      id: 1,
      image: '/path-to-image1.jpg',
      alt: 'Product 1',
      title: 'Product 1',
      description: 'This is the first product.',
      tags: [{ text: 'New', color: '#FF0000' }],
    },
    {
      id: 2,
      image: '/path-to-image2.jpg',
      alt: 'Product 2',
      title: 'Product 2',
      description: 'This is the second product.',
      tags: [{ text: 'Sale', color: '#00FF00' }],
    },
  ];

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            alt={product.alt}
            title={product.title}
            description={product.description}
            tags={product.tags}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.title} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
