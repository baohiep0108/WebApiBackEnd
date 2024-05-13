import React from 'react';
import Header from "@/pages/user/header.jsx"
import Footer from "@/pages/user/footer.jsx";
import {Route, Routes} from "react-router-dom";
import Cart from "@/pages/user/cart.jsx";
import Profile from "@/pages/user/profile.jsx";
import EditProfile from "@/pages/user/editProfile.jsx";
import Product from "@/pages/user/product.jsx";
import ProductDetails from "@/pages/user/productDetails.jsx";
function HomePage() {

    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Product/>}/>
                <Route path="/product/*" element={<ProductDetails/>}/>
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/EditProfile" element={<EditProfile/>}/>
            </Routes>
            <Footer/>
        </div>

    );
}
HomePage.displayName="/src/layout/homePage.jsx"

export default HomePage;