import React, { useState, useEffect } from 'react';
import './Products.css'; // Ensure this file contains the relevant styling.
import 'boxicons';

const products = [
    {
        id: 1,
        name: 'Carrot',
        image: 'https://img.freepik.com/free-photo/fresh-healthy-organic-vegetables-colorful-nutritious-summer-salad-generated-by-artificial-intelligence_25030-60525.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid ',
        description: 'Carrots are rich in beta-carotene, fiber, and various antioxidants.',
        price: 30, // Price in INR
        tags: [{ label: 'Fresh', color: '#ff9b4a' }],
    },
    {
        id: 2,
        name: 'Broccoli',
        image: 'https://img.freepik.com/premium-photo/close-up-green-chili-pepper-table-against-black-background_1048944-6783378.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid ',
        description: 'Broccoli is high in vitamins, minerals, fiber, and antioxidants.',
        price: 60, // Price in INR
        tags: [
            { label: 'Fresh', color: '#70b3b1' },
            { label: 'Organic', color: '#d05fa2' },
        ],
    },
    {
        id: 3,
        name: 'Spinach',
        image: 'https://img.freepik.com/free-photo/spinach-close-up-frying-pan-selective-focus-organic-food-cooking-concept-frying-fresh-green-spinach_166373-1824.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid ',
        description: 'Spinach is a rich source of iron, vitamins, and antioxidants.',
        price: 40, // Price in INR
        tags: [{ label: 'Fresh', color: '#98e64d' }],
    },
    {
        id: 4,
        name: 'Tomato',
        image: 'https://img.freepik.com/free-photo/some-tomato-dark-wooden-textured-background-side-view_176474-3943.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid ',
        description: 'Tomatoes are rich in vitamin C, potassium, and lycopene.',
        price: 50, // Price in INR
        tags: [{ label: 'Organic', color: '#ff6347' }],
    },
    {
        id: 5,
        name: 'Lettuce',
        image: 'data:image/jpeg;base64,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 ',
        description: 'Lettuce is high in water content, vitamins, and fiber.',
        price: 45, // Price in INR
        tags: [{ label: 'Fresh', color: '#5c8b4f' }],
    },
    {
        id: 6,
        name: 'Cucumber',
        image: 'https://img.freepik.com/free-photo/fresh-cucumbers-sliced-dark-background_1150-45029.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid  ',
        description: 'Cucumbers are low in calories and high in antioxidants and water content.',
        price: 35, // Price in INR
        tags: [{ label: 'Organic', color: '#77a64c' }],
    },
    {
        id: 7,
        name: 'Bell Pepper',
        image: 'https://img.freepik.com/free-photo/fresh-tasty-healthy-food-red-yellow-green-peppers-isolated-black-background_8353-8771.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid ',
        description: 'Bell peppers are rich in vitamins A and C, and they have antioxidant properties.',
        price: 70, // Price in INR
        tags: [{ label: 'Fresh', color: '#c5bfc1' }],
    },
    {
        id: 8,
        name: 'Eggplant',
        image: 'https://img.freepik.com/free-photo/still-life-with-delicious-eggplant_23-2150392273.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid',
        description: 'Eggplants are a rich source of fiber, vitamins, and minerals.',
        price: 55, // Price in INR
        tags: [{ label: 'Organic', color: '#9b7a9d' }],
    },
    {
        id: 9,
        name: 'Cauliflower',
        image: 'https://img.freepik.com/premium-photo/cauliflower_53876-61279.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid ',
        description: 'Cauliflower is a great source of fiber and vitamins.',
        price: 65, // Price in INR
        tags: [{ label: 'Fresh', color: '#f0f4f2' }],
    },
    {
        id: 10,
        name: 'Zucchini',
        image: 'https://img.freepik.com/premium-photo/harvesting-zucchini-healthy-uncooked-fresh-green-zucchini-wooden-kitchen-table_1048944-26033131.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid',
        description: 'Zucchini is low in calories, rich in antioxidants, and a good source of vitamin C.',
        price: 40, // Price in INR
        tags: [{ label: 'Fresh', color: '#b4e8b4' }],
    },
    {
        id: 11,
        name: 'Asparagus',
        image: 'https://img.freepik.com/free-photo/top-view-asparagus-with-salad-wooden-spoon_23-2148622387.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid',
        description: 'Asparagus is high in fiber, folate, and vitamins A, C, and K.',
        price: 80, // Price in INR
        tags: [{ label: 'Fresh', color: '#6a9a51' }],
    },
    {
        id: 12,
        name: 'Beetroot',
        image: 'https://img.freepik.com/free-photo/bio-radishes-set-black-background_23-2148332206.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid',
        description: 'Beetroots are rich in folate, manganese, and antioxidants.',
        price: 60, // Price in INR
        tags: [{ label: 'Organic', color: '#9c5f49' }],
    },
    {
        id: 13,
        name: 'Sweet Potato',
        image: 'https://img.freepik.com/free-photo/side-view-potatoes-plate-with-salt-garlic-wooden-table_141793-10937.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid',
        description: 'Sweet potatoes are high in fiber, vitamins, and antioxidants.',
        price: 55, // Price in INR
        tags: [{ label: 'Fresh', color: '#f7b26e' }],
    },
    {
        id: 14,
        name: 'Onion',
        image: 'https://img.freepik.com/premium-photo/shallot-onions-dark-background_1048944-7209375.jpg?ga=GA1.1.562860070.1708444935&semt=ais_hybrid',
        description: 'Onions are rich in antioxidants and have many health benefits.',
        price: 25, // Price in INR
        tags: [{ label: 'Fresh', color: '#d8c4b3' }],
    },
    {
        id: 15,
        name: 'Garlic',
        image: 'https://img.freepik.com/free-photo/fresh-raw-garlic-ready-cook_1150-42636.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
        description: 'Garlic is known for its medicinal properties and is rich in antioxidants.',
        price: 50, // Price in INR
        tags: [{ label: 'Organic', color: '#9b6e4d' }],
    },
    {
        id: 16,
        name: 'Green Beans',
        image: 'https://img.freepik.com/free-photo/fresh-raw-green-beans_181624-6071.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
        description: 'Green beans are high in fiber, vitamin A, and vitamin C.',
        price: 45, // Price in INR
        tags: [{ label: 'Fresh', color: '#60b35f' }],
    },
    {
        id: 17,
        name: 'Artichoke',
        image: 'https://img.freepik.com/premium-photo/close-up-artichoke-table_1048944-8491734.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
        description: 'Artichokes are rich in fiber, antioxidants, and important minerals.',
        price: 90, // Price in INR
        tags: [{ label: 'Organic', color: '#4e8b6f' }],
    },
    {
        id: 18,
        name: 'Cabbage',
        image: 'https://img.freepik.com/free-photo/closeup-vertical-shot-cabbage-plant-field_181624-18514.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid  ',
        description: 'Cabbage is a great source of fiber, vitamins, and minerals.',
        price: 35, // Price in INR
        tags: [{ label: 'Fresh', color: '#8bb9a0' }],
    },
    {
        id: 19,
        name: 'Chili Pepper',
        image: 'https://img.freepik.com/premium-photo/spices-red-chili-garlic-chili-were-placed-black-table_1048944-24396564.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
        description: 'Chili peppers are rich in capsaicin and are a great source of vitamins.',
        price: 50, // Price in INR
        tags: [{ label: 'Organic', color: '#b91d3b' }],
    },
    {
        id: 20,
        name: 'Radish',
        image: 'https://img.freepik.com/free-photo/radishes_1220-180.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
        description: 'Radishes are low in calories, high in antioxidants, and good for digestion.',
        price: 30, // Price in INR
        tags: [{ label: 'Fresh', color: '#e64858' }],
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
                <p>Price: ₹{price}</p> {/* Displaying price */}
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

const Vegetables = () => {
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
                <h2>Vegetables</h2>
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

export default Vegetables;
