import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ProductDetail from './pages/productDetail';
import SignUp from './pages/SignUp';
import Login from './pages/SignIn';
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import About from './pages/about';
import Contact from './pages/contact';


const NavBarLinks = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/product_detail/:id" element={<ProductDetail />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default NavBarLinks