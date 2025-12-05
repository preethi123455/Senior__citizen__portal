import React, { useState, useEffect } from 'react';
import './Products.css'; // Ensure this file contains the relevant styling.
import 'boxicons';

const greens = [
  {
    id: 1,
    name: 'Spinach',
    image: 'https://img.freepik.com/premium-photo/fresh-spinach-dark-background_121234-124.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Spinach is high in iron, calcium, and vitamins A, C, and K.',
    tags: [{ label: 'Organic', color: '#d3b19a' }],
    price: '₹219', // Price in INR
  },
  {
    id: 2,
    name: 'Kale',
    image: 'https://img.freepik.com/free-photo/front-view-bok-choy-with-mushrooms_23-2148685377.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Kale is a nutrient-dense leafy green that is high in vitamins A, C, and K.',
    tags: [{ label: 'Fresh', color: '#70b3b1' }, { label: 'Organic', color: '#d05fa2' }],
    price: '₹259', // Price in INR
  },
  {
    id: 3,
    name: 'Lettuce',
    image: 'https://img.freepik.com/free-photo/fresh-lettuce-leaves-white-background_114579-50367.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Lettuce is a low-calorie, nutrient-packed vegetable high in water content.',
    tags: [{ label: 'Fresh', color: '#d3b19a' }],
    price: '₹179', // Price in INR
  },
  {
    id: 4,
    name: 'Arugula',
    image: 'https://img.freepik.com/premium-photo/high-angle-view-vegetables-table_1048944-8929443.jpg?w=1380',
    description: 'Arugula has a distinct peppery flavor and is rich in antioxidants.',
    tags: [{ label: 'Organic', color: '#d3b19a' }],
    price: '₹229', // Price in INR
  },
  {
    id: 5,
    name: 'Swiss Chard',
    image: 'https://img.freepik.com/premium-photo/rainbow-chard-leaves_1048944-28907434.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Swiss chard is a vibrant leafy green that is rich in antioxidants, vitamins, and minerals.',
    tags: [{ label: 'Fresh', color: '#70b3b1' }],
    price: '₹249', // Price in INR
  },
  {
    id: 6,
    name: 'Collard Greens',
    image: 'https://img.freepik.com/premium-photo/close-up-leaf-against-black-background_1048944-16821948.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Collard greens are packed with vitamins A, C, K, and fiber, perfect for a healthy meal.',
    tags: [{ label: 'Organic', color: '#d05fa2' }],
    price: '₹199', // Price in INR
  },
  {
    id: 7,
    name: 'Mustard Greens',
    image: 'https://img.freepik.com/free-photo/vertical-shot-green-leaves-canonigos-rucula-make-salads_181624-46293.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Mustard greens have a peppery taste and are full of vitamins A, C, and K.',
    tags: [{ label: 'Fresh', color: '#d3b19a' }],
    price: '₹219', // Price in INR
  },
  {
    id: 8,
    name: 'Bok Choy',
    image: 'https://www.thespruceeats.com/thmb/_f_d0PvkB2CKHJyyEDgUg0kYqUk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bok-choy-in-the-kitchen-568935b23df78c3c450eb11a.jpg',
    description: 'Bok choy is a nutritious leafy green that is great for stir-fries and soups.',
    tags: [{ label: 'Organic', color: '#70b3b1' }],
    price: '₹269', // Price in INR
  },
  {
    id: 9,
    name: 'Watercress',
    image: 'https://cdn.britannica.com/78/209678-050-45F3E3EB/watercress-plant.jpg',
    description: 'Watercress is packed with vitamins and is known for its peppery flavor.',
    tags: [{ label: 'Fresh', color: '#d3b19a' }],
    price: '₹189', // Price in INR
  },
  {
    id: 10,
    name: 'Endive',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Endive_-_Cichorium_endivia.jpg',
    description: 'Endive is a crisp, slightly bitter leafy vegetable that pairs well in salads.',
    tags: [{ label: 'Organic', color: '#d05fa2' }],
    price: '₹239', // Price in INR
  },
  {
    id: 11,
    name: 'Romaine Lettuce',
    image: 'https://www.washingtonpost.com/resizer/YtZcpX9lHlbfG-m7yKYrdrp7yq0=/1440x0/smart/filters:no_upscale()/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/ELJ43SYFYI6W4T5ON7H3S5T32I.jpg',
    description: 'Romaine lettuce is a crunchy, refreshing green perfect for salads.',
    tags: [{ label: 'Fresh', color: '#70b3b1' }],
    price: '₹209', // Price in INR
  },
  {
    id: 12,
    name: 'Cabbage',
    image: 'https://www.sprouts.com/wp-content/uploads/2017/03/cabbage.jpg',
    description: 'Cabbage is a nutritious vegetable high in vitamin C and fiber.',
    tags: [{ label: 'Organic', color: '#d3b19a' }],
    price: '₹179', // Price in INR
  },
];

const GreenCard = ({ green, onAddToCart }) => {
  const { name, image, description, tags, price } = green;

  return (
    <div className="card">
      <div className="card-inner" style={{ '--clr': '#fff' }}>
        <div className="box">
          <div className="imgBox">
            <img src={image} alt={name} />
          </div>
          <div className="icon">
            <button className="iconBox" onClick={() => onAddToCart(green)}>
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

const GreensLeafs = () => {
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
            const matchedProduct = greens.find(product => product.name.toLowerCase().includes(productName.trim()));
    
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
        <h2>Leafy Greens</h2>
        <button className="mic-button" onClick={startListening}>
                        <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
                    </button>
        <div className="container" id="Product">
          {greens.map((green) => (
            <GreenCard key={green.id} green={green} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default GreensLeafs;
