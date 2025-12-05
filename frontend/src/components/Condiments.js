import React, { useState, useEffect } from 'react';
import './Products.css';
import 'boxicons';

const condiments = [
  {
    id: 1,
    name: 'Ketchup',
    image: 'https://media.istockphoto.com/id/1403922915/photo/tomato-sauce.jpg?s=612x612&w=0&k=20&c=4XMwd9N01SD60zcuS9mtpmV06oiCnIVirhWILbFfqkY=',
    description: 'Sweet and Salty',
    price: 245.18, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }, { label: 'Locally Produced', color: '#d05fa2' }],
  },
  {
    id: 2,
    name: 'Mayonnaise',
    image: 'https://media.istockphoto.com/id/697026918/photo/opened-mayonnaise-jar-and-spoon.jpg?s=612x612&w=0&k=20&c=pOjnwirLalDJp2QuAdeS-znyVwT7VkbsUSjTu1zroZk=',
    description: 'Creamy',
    price: 287, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }],
  },
  {
    id: 3,
    name: 'Chilli Sauce',
    image: 'https://media.istockphoto.com/id/1173629118/photo/hot-sauce-on-a-table.jpg?s=612x612&w=0&k=20&c=2wdSMIv8x68zlDO5yuRc-0EDdFYOCYMFaI_qtGieTJ0=',
    description: 'Spicy',
    price: 409.18, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }, { label: 'Spicy', color: '#d05fa2' }],
  },
  {
    id: 4,
    name: 'Apple Cider Vinegar',
    image: 'https://media.istockphoto.com/id/1180535551/photo/apple-vinegar-bottle-of-apple-organic-vinegar-made-from-fermented-apples-on-wooden-background.jpg?s=612x612&w=0&k=20&c=mewZWyBfWhck1T9qPL1Zo5sysmAFpbT6AH5srMS5Vqk=',
    description: 'Organic and Fresh',
    price: 266.50, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }],
  },
  {
    id: 5,
    name: 'Soy Sauce',
    image: 'https://media.istockphoto.com/id/1259864884/photo/glass-bottle-with-soy-sauce.jpg?s=612x612&w=0&k=20&c=58fUCeZ4PJc6dJEibWBf5cZ8W9u3S2HcVgxYVjbQygU=',
    description: 'Sour',
    price: 205, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }, { label: 'Sour', color: '#d05fa2' }],
  },
  {
    id: 6,
    name: 'Peanut Butter',
    image: 'https://i.pinimg.com/736x/95/8a/29/958a2983e1761003acf6fb8ee58ab336.jpg',
    description: 'Good source of protein and healthy fats',
    price: 410, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }],
  },
  {
    id: 7,
    name: 'Chocolate Syrup',
    image: 'https://i.pinimg.com/736x/56/dd/fd/56ddfd70ab865f6f07b576f3652cc5fa.jpg',
    description: 'Sweet and smooth',
    price: 533, // Price in INR
    tags: [{ label: 'Cocoa', color: '#d3b19a' }, { label: 'Fresh', color: '#70b3b1' }],
  },
  {
    id: 8,
    name: 'Honey',
    image: 'https://i.pinimg.com/236x/57/5d/50/575d5086f44421fce842a3ba0e35a28d.jpg',
    description: 'Improve memory and reduce the risk of metabolic syndrome',
    price: 574, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }],
  },
];

const CondimentCard = ({ product, onAddToCart }) => {
  const { name, image, description, price, tags } = product;

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
        <p>Price: ₹{price.toFixed(2)}</p> {/* Display price in INR */}
        <ul>
          {tags.map((tag, index) => (
            <li key={index} style={{ '--clr-tag': tag.color }} className="packaging">
              {tag.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Condiments = () => {
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
      const matchedProduct = condiments.find(product => product.name.toLowerCase().includes(productName.trim()));

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
        <h2>Condiments</h2>
        <button className="mic-button" onClick={startListening}>
                        <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
                    </button>
        <div className="container" id="Product">
          {condiments.map((product) => (
            <CondimentCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Condiments;
