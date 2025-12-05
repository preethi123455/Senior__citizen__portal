import React, { useState, useEffect } from 'react';
import './Products.css'; // Ensure this file contains the relevant styling.
import 'boxicons';

const snacks = [
  {
    id: 1,
    name: 'Chips',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Potato_Chips.jpg',
    description: 'Crunchy and savory potato chips, perfect for snacking.',
    price: '₹30',
    tags: [{ label: 'Crispy', color: '#f9c74f' }],
  },
  {
    id: 2,
    name: 'Cookies',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Chocolate_chip_cookies.jpg',
    description: 'Delicious chocolate chip cookies that melt in your mouth.',
    price: '₹50',
    tags: [
      { label: 'Sweet', color: '#f9844a' },
      { label: 'Freshly Baked', color: '#90be6d' },
    ],
  },
  {
    id: 3,
    name: 'Pretzels',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Pretzels.jpg',
    description: 'Classic pretzels with a perfect blend of salt and crunch.',
    price: '₹40',
    tags: [{ label: 'Salty', color: '#43aa8b' }],
  },
  {
    id: 4,
    name: 'Popcorn',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Butter_Popcorn.jpg',
    description: 'Light and fluffy buttered popcorn, great for movie nights.',
    price: '₹60',
    tags: [{ label: 'Buttery', color: '#f3722c' }],
  },
  {
    id: 5,
    name: 'Nachos',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Loaded_Nachos.jpg',
    description: 'Crispy nachos topped with cheese, jalapeños, and salsa.',
    price: '₹100',
    tags: [
      { label: 'Cheesy', color: '#f8961e' },
      { label: 'Spicy', color: '#f94144' },
    ],
  },
  {
    id: 6,
    name: 'Granola Bars',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Granola_bars.jpg',
    description: 'Healthy and delicious granola bars packed with nuts and oats.',
    price: '₹80',
    tags: [{ label: 'Healthy', color: '#577590' }],
  },
  {
    id: 7,
    name: 'Trail Mix',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Trail_mix.jpg',
    description: 'A mix of nuts, dried fruits, and chocolate chips.',
    price: '₹120',
    tags: [
      { label: 'Nutty', color: '#43aa8b' },
      { label: 'Energy Booster', color: '#f9844a' },
    ],
  },
  {
    id: 8,
    name: 'Crackers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Crackers.jpg',
    description: 'Light and crispy crackers, perfect with dips or cheese.',
    price: '₹40',
    tags: [{ label: 'Light', color: '#90be6d' }],
  },
  {
    id: 9,
    name: 'Donuts',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Donuts.jpg',
    description: 'Soft and sweet donuts with various glazes and toppings.',
    price: '₹80',
    tags: [
      { label: 'Sweet', color: '#f3722c' },
      { label: 'Delightful', color: '#f94144' },
    ],
  },
  {
    id: 10,
    name: 'Candy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Candy_Can.jpg',
    description: 'Colorful candies for every occasion and sweet tooth.',
    price: '₹20',
    tags: [{ label: 'Colorful', color: '#f9844a' }],
  },
  {
    id: 11,
    name: 'Energy Bars',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Energy_bar.jpg',
    description: 'Packed with protein and nutrients for a quick energy boost.',
    price: '₹70',
    tags: [
      { label: 'High Energy', color: '#577590' },
      { label: 'Healthy', color: '#43aa8b' },
    ],
  },
  {
    id: 12,
    name: 'Brownies',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Brownies.jpg',
    description: 'Rich and fudgy chocolate brownies for dessert lovers.',
    price: '₹90',
    tags: [{ label: 'Rich', color: '#f94144' }],
  },
];

const ProductCard = ({ product, onAddToCart }) => {
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
        <p className="price">{price}</p> {/* Display the price */}
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

const Snacks = () => {
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
            const matchedProduct = snacks.find(product => product.name.toLowerCase().includes(productName.trim()));
    
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
        <h2>Snacks</h2>
        <button className="mic-button" onClick={startListening}>
                        <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
                    </button>
        <div className="container" id="Product">
          {snacks.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Snacks;
