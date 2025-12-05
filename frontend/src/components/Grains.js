import React, { useState, useEffect } from 'react';
import './Products.css'; 
import 'boxicons';

const grainItems = [
  {
    id: 1,
    name: 'Rice',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Rice_grains.jpg',
    description: 'A staple food for more than half of the world’s population, commonly used in various cuisines.',
    tags: [{ label: 'Organic', color: '#f0c141' }],
    price: 40, // Price in INR per kg
  },
  {
    id: 2,
    name: 'Wheat',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Wheat_grains.jpg',
    description: 'A versatile grain used to make flour, bread, pasta, and various baked goods.',
    tags: [{ label: 'Fresh', color: '#d1b550' }],
    price: 35, // Price in INR per kg
  },
  {
    id: 3,
    name: 'Oats',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Oats_grain.jpg',
    description: 'A nutritious grain often used in breakfast foods like oatmeal and granola.',
    tags: [{ label: 'Organic', color: '#8b8f52' }],
    price: 80, // Price in INR per kg
  },
  {
    id: 4,
    name: 'Barley',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Barley_grain.jpg',
    description: 'A hardy grain used in soups, stews, and to make malt for brewing beer.',
    tags: [{ label: 'Fresh', color: '#a98c54' }],
    price: 60, // Price in INR per kg
  },
  {
    id: 5,
    name: 'Quinoa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Quinoa_seeds.jpg',
    description: 'A high-protein, gluten-free grain that’s often used as a rice or couscous substitute.',
    tags: [{ label: 'Organic', color: '#f2b88c' }],
    price: 120, // Price in INR per kg
  },
  {
    id: 6,
    name: 'Millet',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Millet_grains.jpg',
    description: 'A small, gluten-free grain that is often used in porridge or as a rice substitute.',
    tags: [{ label: 'Fresh', color: '#c9b0af' }],
    price: 50, // Price in INR per kg
  },
  {
    id: 7,
    name: 'Corn',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Corn_grains.jpg',
    description: 'A widely cultivated grain used for food, oil, and various processed products.',
    tags: [{ label: 'Organic', color: '#fdbd3d' }],
    price: 45, // Price in INR per kg
  },
  {
    id: 8,
    name: 'Rye',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Rye_grain.jpg',
    description: 'A grain used to make bread, flour, and alcoholic beverages such as whiskey.',
    tags: [{ label: 'Fresh', color: '#d0cda5' }],
    price: 70, // Price in INR per kg
  },
  {
    id: 9,
    name: 'Buckwheat',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Buckwheat_grains.jpg',
    description: 'A gluten-free seed often used in pancakes, porridge, or as a rice alternative.',
    tags: [{ label: 'Organic', color: '#a5b174' }],
    price: 90, // Price in INR per kg
  },
  {
    id: 10,
    name: 'Amaranth',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Amaranth_grains.jpg',
    description: 'A gluten-free, high-protein seed used as a grain in salads, soups, and baked goods.',
    tags: [{ label: 'Fresh', color: '#eea532' }],
    price: 100, // Price in INR per kg
  },
  {
    id: 11,
    name: 'Spelt',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Spelt_grains.jpg',
    description: 'An ancient grain similar to wheat, often used in bread and pasta.',
    tags: [{ label: 'Organic', color: '#b88d7f' }],
    price: 110, // Price in INR per kg
  },
  {
    id: 12,
    name: 'Teff',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Teff_grains.jpg',
    description: 'A tiny, gluten-free grain from Ethiopia, commonly used to make injera and porridge.',
    tags: [{ label: 'Fresh', color: '#6a4d31' }],
    price: 130, // Price in INR per kg
  },
];

const GrainCard = ({ grainItem, onAddToCart }) => {
  const { name, image, description, tags, price } = grainItem;

  return (
    <div className="card">
      <div className="card-inner" style={{ '--clr': '#fff' }}>
        <div className="box">
          <div className="imgBox">
            <img src={image} alt={name} />
          </div>
          <div className="icon">
            <button className="iconBox" onClick={() => onAddToCart(grainItem)}>
              <box-icon name="cart-add" type="solid" color="#ffffff"></box-icon>
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{name}</h3>
        <p>{description}</p>
        <p><strong>Price:</strong> ₹{price}</p>
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

const GrainItemsList = () => {
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
            const matchedProduct = grainItems.find(product => product.name.toLowerCase().includes(productName.trim()));
    
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
        <h2>Grains</h2>
        <button className="mic-button" onClick={startListening}>
                        <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
                    </button>
        <div className="container" id="Product">
          {grainItems.map((grainItem) => (
            <GrainCard key={grainItem.id} grainItem={grainItem} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GrainItemsList;
