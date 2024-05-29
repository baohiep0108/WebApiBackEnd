import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import { deleteCart, fetchCart, updateCart } from "@/redux/Thunk/cart.js";
import { useDispatch, useSelector } from "react-redux";
import productImg from "/public/img/productImg.png";

export function Cart() {
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { contents: cart, isLoading, error } = useSelector(state => state.cart);
    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        calculateTotalPrice();
    }, [cart]);

    const updateCarts = async (productId, quantity) => {
        if(quantity>20){
            return quantity===20
        }
        try {
            if (quantity === 0) {
                await dispatch(deleteCart(productId));
            } else {
                await dispatch(updateCart({ product: productId, quantity: quantity }));
            }
            await dispatch(fetchCart());
        } catch (err) {
            toast.error("Update quantity failed");
        }
    };

    const calculateTotalPrice = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.products.productPrice * item.quantity;
        });
        setTotalPrice(total);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            navigate("/home/checkOut");
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteCart = async (id) => {
        await dispatch(deleteCart(id));
        toast.success("Delete Product success");
        await dispatch(fetchCart());

    };

    return (
        <div className="py-24 relative">
            <ToastContainer/>
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                {cart.length === 0 ? (
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                            <div className="mx-auto max-w-screen-sm text-center">
                                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">There are currently no orders in the shopping cart.</p>
                                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400"> You'll find lots to explore on the home page.</p>
                                <button onClick={() => navigate("/home")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    Back to Homepage
                                </button>
                            </div>
                        </div>
                    </section>
                ) : (
                    <>
                        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Cart</h2>
                        <form onSubmit={handleSubmit}>
                            {cart.map((item) => (
                                <div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4" key={item.products.productId}>
                                    <div className="col-span-12 lg:col-span-2 img box">
                                        <img src={item.products.img ? `${import.meta.env.VITE_PUBLIC_IMG_URL}/api/Product/GetImage?name=${item.products.img}` : productImg} alt="product image" className="max-lg:w-full lg:w-[180px]" />
                                    </div>
                                    <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                                        <div className="flex items-center justify-between w-full mb-4">
                                            <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">{item.products.productName}</h5>
                                            <button onClick={() => handleDeleteCart(item.products.productId)} type="button" className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400" cx="17" cy="17" r="17" fill="" />
                                                    <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white" d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="font-normal text-base leading-7 text-gray-500 mb-6">{item.products.productDetails}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => updateCarts(item.products.productId, item.quantity - 1)} type="button" className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.5 9.5H13.5" stroke="" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <input
                                                    type="text"
                                                    id="number"
                                                    className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center"
                                                    value={item.quantity}
                                                    onChange={(e) => updateCarts(item.products.productId, parseInt(e.target.value))}
                                                />
                                                <button onClick={() => updateCarts(item.products.productId, item.quantity + 1)} type="button" className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">${(item.products.productPrice)}</h6>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
                                <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">Subtotal</h5>
                                <div className="flex items-center justify-between gap-5">
                                    <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">${totalPrice}</h6>
                                </div>
                            </div>
                            <div className="max-lg:max-w-lg max-lg:mx-auto">
                                <button type="submit" className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700">
                                    Checkout
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;
