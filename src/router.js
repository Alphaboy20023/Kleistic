import { Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ProductDetail from './pages/productDetail';
import Register from './pages/SignUp';
import Login from './pages/SignIn'
import Wishlist from './pages/wishlist';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import About from './pages/about';
import Contact from './pages/contact';
import CategoryPage from './pages/categoryPage';
import AllProducts from './pages/allProduct';



const NavBarLinks = () => {
    return (
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/all_products/:categoryId" element={<AllProducts />} />
                <Route path="/product_detail/:id" element={<ProductDetail />} />
                <Route path="/category/:mainCategory" element={<CategoryPage />} />
            </Routes>
    )
}

export default NavBarLinks