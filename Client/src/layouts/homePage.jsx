import React from 'react';
import Header from "@/pages/user/header.jsx"
import Footer from "@/pages/user/footer.jsx";
import {Route, Routes} from "react-router-dom";
import Cart from "@/pages/user/cart.jsx";
import Profile from "@/pages/user/profile.jsx";
import EditProfile from "@/pages/user/editProfile.jsx";
import Product from "@/pages/user/product.jsx";
import ProductDetails from "@/pages/user/productDetails.jsx";
import Instance from "@/configs/instance.js";
import Order from "@/pages/user/order.jsx";
function HomePage() {
    const data = localStorage.getItem('token');
    if (data) {
        Instance.defaults.headers.common["Authorization"] = `Bearer ${data}`;
    }
    return (
        <>
            <Header/>

            <Routes>
                <Route path="/" element={<Product/>}/>
                <Route path="product/detail/:id" element={<ProductDetails/>}/>
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/EditProfile" element={<EditProfile/>}/>
                <Route path="/Order" element={<Order/>}/>
            </Routes>
            <Footer/>
        </>
    );
}
HomePage.displayName="/src/layout/homePage.jsx"

export default HomePage;