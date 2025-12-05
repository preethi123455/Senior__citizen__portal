import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Cohome from "./components/Cohome";
import Consultation from "./components/DoctorVerification";
import VideoCall from "./components/Consultation" ;
import Grocery from "./components/Grocery";
import Dryfruits from './components/Dryfruits';
import LeafyGreens from './components/LeafyGreens';
import Dairyproducts from './components/Dairyproducts';
import Frozenfoods from './components/Frozenfoods';
import Fruits from './components/Fruits';
import Oils from './components/Oils';
import Snacks from './components/Snacks';
import Vegetables from './components/Vegetables';
import Condiments from './components/Condiments';
import Candies from './components/Candies';
import CannedFoods from './components/CannedFoods';
import MeatPoultry from './components/MeatPoultry';
import Cart from './components/Cart';
import About from './components/About';
import Contact from './components/Contact';
import Seafood from './components/SeaFood';
import Bakery from './components/Bakery'
import SpiceItemsList from './components/Spices';
import GrainItemsList from './components/Grains';
import BeverageItemsList from './components/Bevarages';
import DryGoodsItemsList from './components/DryGoods';
import Checkout from './components/Checkout';
import Ngo from './components/Ngohome'; 
import Ngocons from './components/Ngoconsult';
import Cab from './components/Medicines';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Default route */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
       <Route path="/Home" element={<Home />} />
      <Route path="/cohome" element={<Cohome/>} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/videocall" element={<VideoCall />} />
      
      <Route path="/grocery" element={<Grocery/>} />
      <Route path="/dry" element={<Dryfruits />} />
        <Route path="/leaf" element={<LeafyGreens />}/>
        <Route path="/dairy" element={<Dairyproducts />}/>
        <Route path="/frozen" element={<Frozenfoods />}/>
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/oils" element={<Oils />}/>
        <Route path="/snacks" element={<Snacks />}/>
        <Route path="/vegetables" element={<Vegetables />}/>
        <Route path="/condiments" element={<Condiments />} />
        <Route path="/candies" element={<Candies />}/>
        <Route path="/cannedfoods" element={<CannedFoods />}/>
        <Route path="/meatpoultry" element={<MeatPoultry />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/seafood" element={<Seafood />}/>
        <Route path="/bakery" element={<Bakery />}/>
        <Route path="/spices" element={<SpiceItemsList />}/>
        <Route path="/grains" element={<GrainItemsList />}/>
        <Route path="/bevarages" element={<BeverageItemsList />}/>
        <Route path="/drygoods" element={<DryGoodsItemsList />}/> 
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ngo" element={<Ngo />} />
        <Route path="/ngoc" element={<Ngocons/>} />
        <Route path="/cab" element={<Cab/>} />
    </Routes>
  );
}

export default App;
