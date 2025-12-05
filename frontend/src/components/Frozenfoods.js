import React, { useState, useEffect } from 'react';
import './Products.css'; // Ensure this file contains the relevant styling.
import 'boxicons';

const frozenFoods = [
  {
    id: 1,
    name: 'Frozen Pizza',
    image: 'https://www.dominos.co.uk/sites/default/files/styles/promo_image/public/promoimages/850x600_frozen-pizza.webp?itok=hgP1llmO',
    description: 'A delicious frozen pizza with cheese and pepperoni.',
    tags: [{ label: 'Frozen', color: '#ff6347' }],
    price: 299, // Price in INR
  },
  {
    id: 2,
    name: 'Frozen Fries',
    image: 'https://cdn.shopify.com/s/files/1/0383/9191/3114/products/friesfrozen_1500x1500.jpg?v=1599608703',
    description: 'Crispy golden fries ready to cook.',
    tags: [
      { label: 'Frozen', color: '#ffd700' },
      { label: 'Vegetarian', color: '#32cd32' },
    ],
    price: 199, // Price in INR
  },
  {
    id: 3,
    name: 'Frozen Vegetables',
    image: 'https://www.sainsburys.co.uk/webapp/wcs/stores/servlet/ssbinary/Frozen-veg.jpg',
    description: 'A mix of frozen vegetables for a healthy meal.',
    tags: [{ label: 'Frozen', color: '#98fb98' }],
    price: 150, // Price in INR
  },
  {
    id: 4,
    name: 'Frozen Fish Fillets',
    image: 'https://www.frozen-fish.com/wp-content/uploads/2021/05/frozen-fish-fillets.jpg',
    description: 'High-quality frozen fish fillets, perfect for grilling.',
    tags: [{ label: 'Frozen', color: '#87cefa' }],
    price: 450, // Price in INR
  },
  {
    id: 5,
    name: 'Frozen Chicken Wings',
    image: 'https://www.southernliving.com/thmb/YoPZqXlRbdWRFXhT1mDjcfnlHlw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/frozen-chicken-wings-58b89f4d3df78c5165f9a86b7fcfa3fd.jpg',
    description: 'Juicy and crispy chicken wings, ready to cook.',
    tags: [{ label: 'Frozen', color: '#ff6347' }],
    price: 349, // Price in INR
  },
  {
    id: 6,
    name: 'Frozen Shrimp',
    image: 'https://www.bumblebee.com/wp-content/uploads/2022/03/frozen-shrimp.jpg',
    description: 'High-quality shrimp, peeled and deveined.',
    tags: [{ label: 'Frozen', color: '#ff4500' }],
    price: 599, // Price in INR
  },
  {
    id: 7,
    name: 'Frozen Dumplings',
    image: 'https://www.buzzfeed.com/buzzfeed-static/static/2021-02/5/11/enhanced/55d3f300f7b0/original-17276-1612540046-9.jpg',
    description: 'Delicious frozen dumplings, ready for steaming or frying.',
    tags: [{ label: 'Frozen', color: '#f0e68c' }],
    price: 220, // Price in INR
  },
  {
    id: 8,
    name: 'Frozen Ice Cream',
    image: 'https://www.cnbc.com/wp-content/uploads/2021/07/104835048-icecream_supermarket_shutterstock.jpg',
    description: 'A variety of frozen ice cream flavors to indulge in.',
    tags: [{ label: 'Frozen', color: '#ffb6c1' }],
    price: 350, // Price in INR
  },
  {
    id: 9,
    name: 'Frozen Bread',
    image: 'https://media.istockphoto.com/photos/frozen-bread-slices-in-plastic-bag-on-white-background-picture-id1203453467',
    description: 'Frozen bread, ready to toast or bake.',
    tags: [{ label: 'Frozen', color: '#deb887' }],
    price: 99, // Price in INR
  },
  {
    id: 10,
    name: 'Frozen French Toast',
    image: 'https://www.frozenbreakfast.com/images/products/french-toast.png',
    description: 'Frozen French toast sticks for a quick breakfast.',
    tags: [{ label: 'Frozen', color: '#ffdab9' }],
    price: 180, // Price in INR
  },
  {
    id: 11,
    name: 'Frozen Meatballs',
    image: 'https://www.foodnetwork.com/content/dam/images/food/fullset/2020/11/23/0/FNK_Shrimp_Meatball_Meal_Tea_Hero.jpg',
    description: 'Delicious and juicy frozen meatballs for pasta or subs.',
    tags: [{ label: 'Frozen', color: '#c71585' }],
    price: 500, // Price in INR
  },
  {
    id: 12,
    name: 'Frozen Breakfast Burritos',
    image: 'https://www.cookinglight.com/thmb/OhzB0g6gGmtoJfVh9lD0hXzS-Ps=/1920x1080/filters:no_upscale():max_bytes(150000):strip_icc()/frozenbreakfastburritos-0e1ca74c5a734edc8cc8c14f9987fc57.jpg',
    description: 'Frozen breakfast burritos for a quick and hearty meal.',
    tags: [{ label: 'Frozen', color: '#ff69b4' }],
    price: 260, // Price in INR
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

const FrozenFoods = () => {
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
            const matchedProduct = frozenFoods.find(product => product.name.toLowerCase().includes(productName.trim()));
    
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
        <h2>Frozen Foods</h2>
        <button className="mic-button" onClick={startListening}>
                        <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
                    </button>
        <div className="container" id="Product">
          {frozenFoods.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FrozenFoods;
