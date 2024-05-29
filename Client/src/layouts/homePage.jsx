import React from 'react';
import Header from "@/pages/user/header.jsx"
import Footer from "@/pages/user/footer.jsx";
import {Route, Routes} from "react-router-dom";
import Cart from "@/pages/user/cart.jsx";
import Profile from "@/pages/user/profile.jsx";
import EditProfile from "@/pages/user/editProfile.jsx";
import Product from "@/pages/user/product.jsx";
import Instance from "@/configs/instance.js";
import Order from "@/pages/user/order.jsx";
import OrderDetails from "@/pages/user/OrderDetails.jsx";
import Checkout from "@/pages/user/checkout.jsx";
import ProductDetails from "@/pages/user/productDetails.jsx";
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
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/EditProfile" element={<EditProfile/>}/>
                <Route path="/Order" element={<Order/>}/>
                <Route path="/CheckOut" element={<Checkout/>}/>
                <Route path="/Order/Details/:id" element={<OrderDetails/>}/>
            </Routes>
            <Footer/>
            <df-messenger
                intent="WELCOME"
                chat-title="ChatApp"
                agent-id="1f06eba3-7981-485b-ab4d-587b32067a91"
                language-code="en"
            ></df-messenger>
        </>
    );
}

HomePage.displayName = "/src/layout/homePage.jsx"

export default HomePage;