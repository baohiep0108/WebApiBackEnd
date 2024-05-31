import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchCart} from "@/redux/Thunk/cart.js";
import {placeOrder} from "@/redux/Thunk/order.js";
import Instance from "@/configs/instance.js";
import {toast, ToastContainer} from "react-toastify";

function Checkout() {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice]= useState(0);
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber]= useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [orderDescription, setOrderDescription] = useState("");
    const [payWithCard, setPayWithCard] = useState(true);
    const { contents: cart, isLoading, error } = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        calculateTotalPrice();
    }, [cart]);

    const calculateTotalPrice = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.products.productPrice * item.quantity;
        });
        setTotalPrice(total);
    };
    const totalProduct = (quantity, price) => {
        return quantity * price;
    }

    const handlePaymentMethodChange = (event) => {
        setPayWithCard(event.target.id === 'radio_1');
    };

    const handleSubmitOrder = async (event) => {
        event.preventDefault();
        if (payWithCard) {
            const data = {
                orderType: 'Thanh toán bằng thẻ',
                name: name,
                amount: totalPrice,
                orderDescription: orderDescription,
                phoneNumber: phoneNumber,
                address: address,
            };
            try {
                const response = await Instance.post("/api/Payment", data);
                window.location.href = response.data;
            } catch (err) {
                toast.error("Payment failed");
            }
        } else {
            try {
                await dispatch(placeOrder());
                toast.success("Order placed successfully");
                navigate("/home", { state: { message: "Order Success", style: "success" } })
            } catch (err) {
                toast.error("Order placement failed");
            }
        }
    }
    return (
        <div>
            <ToastContainer/>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {cart.map((checkout) => (
                            <div key={checkout.id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img
                                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                    src={`${import.meta.env.VITE_PUBLIC_IMG_URL}/api/Product/GetImage?name=${checkout.products.img}`}
                                    alt="ảnh sản phẩm"
                                />
                                <div className="flex w-full flex-col px-4 py-4">
                                    <span className="font-semibold">{checkout.products.productName}</span>
                                    <span className="float-right text-gray-400">{checkout.products.productDetails}</span>
                                    <p className="text-lg font-bold">{totalProduct(checkout.quantity, checkout.products.productPrice)}đ</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-8 text-lg font-medium">Payment Methods</p>
                    <form className="mt-5 grid gap-6">
                        <div className="relative">
                            <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked onChange={handlePaymentMethodChange} />
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Pay with credit card</span>
                                </div>
                            </label>
                        </div>
                        <div className="relative">
                            <input className="peer hidden" id="radio_2" type="radio" name="radio" onChange={handlePaymentMethodChange} />
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                                <div className="ml-5">
                                    <span className="mt-2 font-semibold">Pay with cash</span>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                <form onSubmit={handleSubmitOrder}>
                    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                        <p className="text-xl font-medium">Payment Details</p>
                        <p className="text-gray-400">Complete your order by providing your payment details.</p>
                        <div>
                            <label htmlFor="name" className="mt-4 mb-2 block text-sm font-medium">Name</label>
                            <div className="relative">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text" id="name" name="name"
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Enter your name" disabled={!payWithCard}/>
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                                    </svg>
                                </div>
                            </div>
                            <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
                            <div className="relative">
                                <input
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    type="text" id="phone" name="phone"
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Enter your phone" disabled={!payWithCard}/>
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"/>
                                    </svg>
                                </div>
                            </div>

                            <label htmlFor="address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
                            <div className="relative">
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text" id="address" name="address"
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Enter your address" disabled={!payWithCard}/>
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"/>
                                    </svg>
                                </div>
                            </div>

                            <label htmlFor="order-description" className="mt-4 mb-2 block text-sm font-medium">Order Description</label>
                            <div className="relative">
                                <textarea
                                    value={orderDescription}
                                    onChange={(e)=>setOrderDescription(e.target.value)}
                                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Please write an order description" disabled={!payWithCard}/>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalPrice}đ</p>
                            </div>
                        </div>
                        <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkout;
