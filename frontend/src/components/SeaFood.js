import React, { useState, useEffect } from 'react';
import './Products.css'; // Ensure this file contains the relevant styling.
import 'boxicons';

const seafood = [
  {
    id: 1,
    name: 'Salmon',
    image: 'https://www.fishwatch.gov/sites/default/files/salmon-sashimi.jpg',
    description: 'Salmon is a rich source of omega-3 fatty acids and is great for heart health.',
    price: 800, // Price in INR
    tags: [{ label: 'Fresh', color: '#d3b19a' }],
  },
  {
    id: 2,
    name: 'Tuna',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Tuna_fish.jpg',
    description: 'Tuna is a lean source of protein, commonly used in sushi and salads.',
    price: 600, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }, { label: 'Wild-caught', color: '#d05fa2' }],
  },
  {
    id: 3,
    name: 'Shrimp',
    image: 'https://www.abc.net.au/cm/rimage/10043052-3x2-xlarge.jpg?v=1',
    description: 'Shrimp is high in protein and low in calories, making it a healthy choice for meals.',
    price: 400, // Price in INR
    tags: [{ label: 'Fresh', color: '#d3b19a' }],
  },
  {
    id: 4,
    name: 'Lobster',
    image: 'https://www.fishwatch.gov/sites/default/files/lobster.jpg',
    description: 'Lobster is a succulent shellfish rich in protein and low in fat.',
    price: 1200, // Price in INR
    tags: [{ label: 'Fresh', color: '#d05fa2' }],
  },
  {
    id: 5,
    name: 'Scallops',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Scallops_1.jpg',
    description: 'Scallops are a delicate, sweet seafood rich in protein and low in fat.',
    price: 850, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }],
  },
  {
    id: 6,
    name: 'Crab',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Blue_Crab_%28Callinectes_sapidus%29.jpg',
    description: 'Crab is a popular seafood with a sweet, delicate flavor and high protein content.',
    price: 900, // Price in INR
    tags: [{ label: 'Fresh', color: '#d3b19a' }],
  },
  {
    id: 7,
    name: 'Mussels',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Mussels_in_shell.jpg',
    description: 'Mussels are rich in vitamins, minerals, and omega-3 fatty acids.',
    price: 500, // Price in INR
    tags: [{ label: 'Fresh', color: '#d05fa2' }],
  },
  {
    id: 8,
    name: 'Clams',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Clams.jpg',
    description: 'Clams are a low-calorie seafood rich in vitamins, minerals, and antioxidants.',
    price: 550, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }],
  },
  {
    id: 9,
    name: 'Octopus',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Octopus_military.jpg',
    description: 'Octopus is a delicious seafood that is high in protein and rich in nutrients.',
    price: 950, // Price in INR
    tags: [{ label: 'Fresh', color: '#d3b19a' }],
  },
  {
    id: 10,
    name: 'Swordfish',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Swordfish.jpg',
    description: 'Swordfish is a firm, meaty fish high in protein and a great source of omega-3s.',
    price: 1100, // Price in INR
    tags: [{ label: 'Fresh', color: '#d05fa2' }],
  },
  {
    id: 11,
    name: 'Tilapia',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Tilapia_fish.jpg',
    description: 'Tilapia is a mild-flavored white fish rich in protein and low in fat.',
    price: 400, // Price in INR
    tags: [{ label: 'Fresh', color: '#70b3b1' }],
  },
  {
    id: 12,
    name: 'Sea Bass',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Sea_bass.png',
    description: 'Sea bass is a tender fish with a delicate flavor and firm texture.',
    price: 950, // Price in INR
    tags: [{ label: 'Fresh', color: '#d3b19a' }],
  },
];

const SeafoodCard = ({ seafoodItem, onAddToCart }) => {
  const { name, image, description, price, tags } = seafoodItem;

  return (
    <div className="card">
      <div className="card-inner" style={{ '--clr': '#fff' }}>
        <div className="box">
          <div className="imgBox">
            <img src={image} alt={name} />
          </div>
          <div className="icon">
            <button className="iconBox" onClick={() => onAddToCart(seafoodItem)}>
              <box-icon name="cart-add" type="solid" color="#ffffff"></box-icon>
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{name}</h3>
        <p>{description}</p>
        <p className="price">₹{price}</p> {/* Display the price in INR */}
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

const Seafood = () => {
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
            const matchedProduct = seafood.find(product => product.name.toLowerCase().includes(productName.trim()));
    
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
        <h2>Seafood</h2>
        <button className="mic-button" onClick={startListening}>
                        <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
                    </button>
        <div className="container" id="Product">
          {seafood.map((seafoodItem) => (
            <SeafoodCard key={seafoodItem.id} seafoodItem={seafoodItem} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Seafood;
