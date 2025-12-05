import React, { useState, useEffect } from 'react';
import './Products.css'; // Ensure this file contains the relevant styling.
import 'boxicons';

const products = [
  {
    id: 1,
    name: 'Olive Oil',
    image: 'https://media.istockphoto.com/id/1346616628/photo/olives-and-olive-oil-in-a-bottles.jpg?s=612x612&w=0&k=20&c=yXZ4F29dH5s5e24AfyVsWmnrKPH7pkOj9k89b7cSryk=',
    description: 'A versatile oil ideal for cooking, salad dressings, and skincare.',
    price: 650, // Price in INR
    tags: [{ label: 'Organic', color: '#d3b19a' }],
  },
  {
    id: 2,
    name: 'Coconut Oil',
    image: 'https://www.healthline.com/hlcmsresource/images/topic_centers/coconut-oil-1296x728-feature.jpg',
    description: 'Rich in healthy fats, great for cooking, and promoting skin health.',
    price: 450, // Price in INR
    tags: [{ label: 'Organic', color: '#70b3b1' }],
  },
  {
    id: 3,
    name: 'Sunflower Oil',
    image: 'https://www.verywellfit.com/thmb/_TKGh7chAyJ9dGTjzJ9p14QzLfY=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/sunflower-oil-629213518-5b0e8bdbc9e77c0025d30375.jpg',
    description: 'Ideal for frying, sautéing, and baking.',
    price: 380, // Price in INR
    tags: [{ label: 'Cold-Pressed', color: '#d3b19a' }],
  },
  {
    id: 4,
    name: 'Canola Oil',
    image: 'https://cdn.shopify.com/s/files/1/0076/4299/1062/articles/Canola_oil.jpg',
    description: 'Low in saturated fats, often used for frying and baking.',
    price: 400, // Price in INR
    tags: [{ label: 'Refined', color: '#70b3b1' }],
  },
  {
    id: 5,
    name: 'Avocado Oil',
    image: 'https://www.verywellfit.com/thmb/Qzj0Ad9yVh7FwD2kQgsA9n1VsAY=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/avocado-oil-628f019c6f77446fb54a462e.jpg',
    description: 'Perfect for high-heat cooking and great for skin care.',
    price: 1200, // Price in INR
    tags: [{ label: 'Cold-Pressed', color: '#d05fa2' }],
  },
  {
    id: 6,
    name: 'Grapeseed Oil',
    image: 'https://www.verywellfit.com/thmb/OjeH7z8L02D9rF0nxzX1FZ0aF7E=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/grapeseed-oil-58d2b2db3df78c353c71d171.jpg',
    description: 'Good for frying, grilling, and sautéing.',
    price: 700, // Price in INR
    tags: [{ label: 'Light', color: '#d3b19a' }],
  },
  {
    id: 7,
    name: 'Sesame Oil',
    image: 'https://www.verywellfit.com/thmb/MhdS8dMlhFn2t7jQcs1bFL5h2eM=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/sesame-oil-58d2b2db3df78c353c71d172.jpg',
    description: 'Commonly used in Asian cooking and for skin care.',
    price: 850, // Price in INR
    tags: [{ label: 'Unrefined', color: '#d3b19a' }],
  },
  {
    id: 8,
    name: 'Peanut Oil',
    image: 'https://www.verywellfit.com/thmb/XjcU8h9p6fELmWIEE8be75O-vjo=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/peanut-oil-58d2b2db3df78c353c71d174.jpg',
    description: 'Great for frying and sautéing, with a mild flavor.',
    price: 500, // Price in INR
    tags: [{ label: 'Refined', color: '#70b3b1' }],
  },
  {
    id: 9,
    name: 'Walnut Oil',
    image: 'https://www.verywellfit.com/thmb/dnBxoKMowfx4UGnx66PfmPxbDi8=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/walnut-oil-58d2b2db3df78c353c71d173.jpg',
    description: 'Ideal for salad dressings and drizzling over cooked foods.',
    price: 900, // Price in INR
    tags: [{ label: 'Cold-Pressed', color: '#d05fa2' }],
  },
  {
    id: 10,
    name: 'Flaxseed Oil',
    image: 'https://www.verywellfit.com/thmb/gMd61z7YpEhsdaJzh8hf9w2Rh78=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/flaxseed-oil-58d2b2db3df78c353c71d175.jpg',
    description: 'Rich in omega-3 fatty acids, perfect for salads and smoothies.',
    price: 1100, // Price in INR
    tags: [{ label: 'Cold-Pressed', color: '#70b3b1' }],
  },
  {
    id: 11,
    name: 'Hemp Oil',
    image: 'https://www.verywellfit.com/thmb/5sm55RZXMwfojZddZzPjj7Ybd68=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/hemp-oil-58d2b2db3df78c353c71d176.jpg',
    description: 'High in essential fatty acids, used for both cooking and skin care.',
    price: 1500, // Price in INR
    tags: [{ label: 'Organic', color: '#d05fa2' }],
  },
  {
    id: 12,
    name: 'Pumpkin Seed Oil',
    image: 'https://www.verywellfit.com/thmb/5PjeGsQhd3JGV-y_mg9tLgM5NWI=/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/pumpkin-seed-oil-58d2b2db3df78c353c71d177.jpg',
    description: 'Ideal for salads and as a drizzle on roasted vegetables.',
    price: 850, // Price in INR
    tags: [{ label: 'Cold-Pressed', color: '#d3b19a' }],
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
        <p><strong>Price: ₹{price}</strong></p>
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

const Oils = () => {
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
            const matchedProduct = products.find(product => product.name.toLowerCase().includes(productName.trim()));
    
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
        <h2>Oils</h2>
        <button className="mic-button" onClick={startListening}>
                        <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
                    </button>
        <div className="container" id="Product">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Oils;
