import React, { useState } from 'react';
import './Products.css';
import 'boxicons';

const dairyProducts = [
    { id: 1, name: 'Butter', image: 'https://www.eatingwithfoodallergies.com/wp-content/uploads/2023/03/Is-butter-dairy-free-featured.jpg', description: 'High in short-chain fatty acids, calcium, and vitamins D.', price: 3.99 * 83, tags: [{ label: 'Organic', color: '#d3b19a' }, { label: 'Fresh', color: '#70b3b1' }] },
    { id: 2, name: 'Cheese', image: 'https://cdn.usdairy.com/optimize/getmedia/0f415696-c423-4e0d-b5d2-cee2e016d020/012414cheese_400.jpg.jpg.aspx?format=webp', description: 'Loaded with protein, calcium, vitamin B12, and healthy fats.', price: 5.49 * 83, tags: [{ label: 'Organic', color: '#d3b19a' }, { label: 'Fresh', color: '#70b3b1' }] },
    { id: 3, name: 'Milk', image: 'https://static.wixstatic.com/media/9a32a6_5e30325f53c9469a87d5a7503f1d56e3~mv2.jpg/v1/fill/w_1024,h_683,al_c,q_85,usm_0.66_1.00_0.01/9a32a6_5e30325f53c9469a87d5a7503f1d56e3~mv2.webp', description: 'A great source of calcium, vitamin D, and protein.', price: 2.99 * 83, tags: [{ label: 'Fresh', color: '#d3b19a' }, { label: 'Locally Produced', color: '#70b3b1' }] },
    {
        id: 4,name: 'Yogurt',
        image: 'https://www.cooksillustrated.com/digital_images/198/large/90.jpg',
        description: 'Rich in probiotics, protein, and calcium.',
        price: 4.29 * 83, // Converted to INR
        tags: [{ label: 'Fresh', color: '#d3b19a' }],
    },
    {
        id: 5,
        name: 'Cream',
        image: 'https://www.sallysbakingaddiction.com/wp-content/uploads/2017/12/whipped-cream.jpg',
        description: 'Made from milk fat, great for cooking, baking, or as a topping.',
        price: 3.49 * 83, // Converted to INR
        tags: [{ label: 'Organic', color: '#d3b19a' }],
    },
    {
        id: 6,
        name: 'Cottage Cheese',
        image: 'https://www.thekitchn.com/wp-content/uploads/2020/08/What-Is-Cottage-Cheese-hero-1200.jpg',
        description: 'A fresh cheese that is high in protein and low in fat.',
        price: 4.19 * 83, // Converted to INR
        tags: [{ label: 'Fresh', color: '#70b3b1' }],
    },
    {
        id: 7,
        name: 'Ice Cream',
        image: 'https://www.verywellfit.com/thmb/OAYRUfojw1EX8J0V7WVw-Vtb4sM=/500x350/filters:no_upscale():max_bytes(150000):strip_icc()/Ice-Cream-Thumbnail-57ab89d23df78c590f8e93e1.jpg',
        description: 'A sweet frozen dessert made with milk and cream.',
        price: 6.99 * 83, // Converted to INR
        tags: [{ label: 'Fresh', color: '#70b3b1' }],
    },
    {
        id: 8,
        name: 'Ghee',
        image: 'https://www.earth.com/wp-content/uploads/2022/10/ghee-1200.jpg',
        description: 'Clarified butter used in Indian cuisine with a rich taste.',
        price: 8.49 * 83, // Converted to INR
        tags: [{ label: 'Organic', color: '#d3b19a' }],
    },
    {
        id: 9,
        name: 'Ricotta Cheese',
        image: 'https://cdn11.bigcommerce.com/s-ryxw9l8/images/stencil/1280x1280/products/3798/17834/whole-milk-ricotta-5-lbs_800x.jpg?c=1570519295',
        description: 'A soft, creamy cheese often used in Italian dishes like lasagna.',
        price: 5.99 * 83, // Converted to INR
        tags: [{ label: 'Organic', color: '#d3b19a' }],
    },
    {
        id: 10,
        name: 'Buttermilk',
        image: 'https://www.loveandlemons.com/wp-content/uploads/2020/08/how-to-make-buttermilk-750x500.jpg',
        description: 'A tangy, fermented dairy drink made from milk.',
        price: 2.79 * 83, // Converted to INR
        tags: [{ label: 'Fresh', color: '#70b3b1' }],
    },
    {
        id: 11,
        name: 'Kefir',
        image: 'https://i.pinimg.com/originals/00/1f/8f/001f8f087e7be82fe9f473fbe9f18ba7.jpg',
        description: 'A fermented milk drink, rich in probiotics and gut-friendly.',
        price: 3.69 * 83, // Converted to INR
        tags: [{ label: 'Fresh', color: '#70b3b1' }],
    },
    {
        id: 12,
        name: 'Clotted Cream',
        image: 'https://www.deliciousmagazine.co.uk/wp-content/uploads/2021/05/clotted-cream-1200x1200.jpg',
        description: 'A rich cream with a thick consistency, commonly served with scones.',
        price: 7.99 * 83, // Converted to INR
        tags: [{ label: 'Organic', color: '#d3b19a' }],
    },

];

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="card">
            <div className="card-inner">
                <div className="box">
                    <div className="imgBox">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="icon">
                        <button className="iconBox" onClick={() => onAddToCart(product)}>
                            <box-icon name="cart-add" type="solid" color="#ffffff"></box-icon>
                        </button>
                    </div>
                </div>
            </div>
            <div className="content">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Price: ₹{product.price.toFixed(2)}</strong></p>
                <ul>
                    {product.tags.map((tag, index) => (
                        <li key={index} style={{ backgroundColor: tag.color }} className="packaging">
                            {tag.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Dairy = () => {
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
            const matchedProduct = dairyProducts.find(product => product.name.toLowerCase().includes(productName.trim()));
    
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
                <div className="header">
                    <h2>Dairy Products</h2>
                    <button className="mic-button" onClick={startListening}>
                        <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
                    </button>
                </div>
                <div className="container" id="Product">
                    {dairyProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dairy;
