import React, { useState, useEffect } from 'react';
import './Products.css'; // Ensure this file contains the relevant styling.
import 'boxicons';

const bakeryItems = [
  {
    id: 1,
    name: 'Chocolate Croissant',
    image: 'https://www.example.com/chocolate-croissant.jpg',
    description: 'Flaky and buttery croissant filled with rich chocolate.',
    tags: [{ label: 'Bakery', color: '#8b4513' }],
    price: 150, // Price in INR
  },
  {
    id: 2,
    name: 'Blueberry Muffin',
    image: 'https://www.example.com/blueberry-muffin.jpg',
    description: 'Soft muffin with fresh blueberries.',
    tags: [
      { label: 'Bakery', color: '#ff6347' },
      { label: 'Vegetarian', color: '#32cd32' },
    ],
    price: 120, // Price in INR
  },
  {
    id: 3,
    name: 'Sourdough Bread',
    image: 'https://www.example.com/sourdough-bread.jpg',
    description: 'Traditional sourdough bread with a tangy flavor.',
    tags: [{ label: 'Bakery', color: '#deb887' }],
    price: 200, // Price in INR
  },
  {
    id: 4,
    name: 'Cinnamon Rolls',
    image: 'https://www.example.com/cinnamon-rolls.jpg',
    description: 'Soft and gooey cinnamon rolls with icing.',
    tags: [{ label: 'Bakery', color: '#ffdab9' }],
    price: 180, // Price in INR
  },
  {
    id: 5,
    name: 'Bagels',
    image: 'https://www.example.com/bagels.jpg',
    description: 'Freshly baked bagels, perfect for breakfast.',
    tags: [{ label: 'Bakery', color: '#d2691e' }],
    price: 100, // Price in INR
  },
  {
    id: 6,
    name: 'Apple Pie',
    image: 'https://www.example.com/apple-pie.jpg',
    description: 'Classic apple pie with a buttery crust.',
    tags: [{ label: 'Bakery', color: '#ff4500' }],
    price: 250, // Price in INR
  },
  {
    id: 7,
    name: 'Lemon Drizzle Cake',
    image: 'https://www.example.com/lemon-drizzle-cake.jpg',
    description: 'Moist lemon cake with a tangy drizzle.',
    tags: [{ label: 'Bakery', color: '#ffeb3b' }],
    price: 220, // Price in INR
  },
  {
    id: 8,
    name: 'Churros',
    image: 'https://www.example.com/churros.jpg',
    description: 'Fried dough with sugar and cinnamon.',
    tags: [{ label: 'Bakery', color: '#ffb6c1' }],
    price: 180, // Price in INR
  },
  {
    id: 9,
    name: 'Vanilla Cupcakes',
    image: 'https://www.example.com/vanilla-cupcakes.jpg',
    description: 'Fluffy vanilla cupcakes with buttercream frosting.',
    tags: [{ label: 'Bakery', color: '#f5deb3' }],
    price: 130, // Price in INR
  },
  {
    id: 10,
    name: 'Fruit Tart',
    image: 'https://www.example.com/fruit-tart.jpg',
    description: 'Crispy tart crust filled with fresh fruits.',
    tags: [{ label: 'Bakery', color: '#ff6347' }],
    price: 300, // Price in INR
  },
];

const formatAsINR = (price) => {
  return `₹${price.toFixed(2)}`; // Format price as INR
};

const ProductCard = ({ product, onAddToCart }) => {
  const { name, image, description, tags, price } = product;

  return (
    <div className="card">
      <div className="card-inner" style={{ '--clr': '#fff' }}>
        <div className="box">
          <div className="imgBox">
            <img src={image} alt={name} />
          </div>
          <div className="icon">
            <button className="iconBox" onClick={() => onAddToCart(product)}>
              <box-icon name="cart-add" type="solid" color="#ffffff"></box-icon>
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{name}</h3>
        <p>{description}</p>
        <ul>
          {tags.map((tag, index) => (
            <li key={index} style={{ '--clr-tag': tag.color }} className="packaging">
              {tag.label}
            </li>
          ))}
        </ul>
        <p className="price">{formatAsINR(price)}</p> {/* Display price in INR */}
      </div>
    </div>
  );
};

const BakeryItems = () => {
  const [cart, setCart] = useState([]);
    const [isListening, setIsListening] = useState(false);

    const numberWords = {
      "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
      "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
      "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
      "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
      "nineteen": 19, "twenty": 20
  };
  
  const startListening = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
      if (!SpeechRecognition) {
          alert('Your browser does not support speech recognition. Please use Chrome.');
          return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
  
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
  
      recognition.onresult = (event) => {
          let transcript = event.results[0][0].transcript.toLowerCase();
          console.log("Recognized:", transcript);
  
          // Extract numeric quantity (e.g., "2") or convert words (e.g., "two")
          let words = transcript.split(" ");
          let quantity = 1; // Default quantity
  
          for (let word of words) {
              if (!isNaN(word)) {
                  quantity = parseInt(word, 10); // If a digit is found (e.g., "2"), use it
                  break;
              } else if (numberWords[word]) {
                  quantity = numberWords[word]; // Convert spoken number to integer
                  break;
              }
          }
  
          // Remove number from transcript to isolate product name
          let productName = words.filter(word => isNaN(word) && !numberWords[word]).join(" ");
  
          // Match with existing products
          const matchedProduct = bakeryItems.find(product => product.name.toLowerCase().includes(productName.trim()));
  
          if (matchedProduct) {
              handleAddToCart(matchedProduct, quantity);
          } else {
              alert(`No matching product found for "${transcript}". Please try again.`);
          }
      };
  
      recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          alert("Error recognizing speech. Please try again.");
      };
  
      recognition.start();
  };
  
  const handleAddToCart = (product, quantity) => {
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
      let updatedCart = [...cart];
  
      if (existingItemIndex !== -1) {
          updatedCart[existingItemIndex].quantity += quantity;
      } else {
          updatedCart.push({ ...product, quantity });
      }
  
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert(`${quantity} x ${product.name} has been added to your cart!`);
  };
  
  return (
    <div>
      <section id="Products">
        <h2>Bakery Items</h2>
        <button className="mic-button" onClick={startListening}>
          <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
        </button>
        <div className="container" id="Product">
          {bakeryItems.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BakeryItems;
