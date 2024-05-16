import React, { useEffect, useState } from 'react';
import Instance from "@/configs/instance.js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Order() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = () => {
        Instance.get("api/Order/Show-order")
            .then(response => {
                console.log("order", response.data);
                setOrders(response.data);
            })
            .catch((err) => console.log(err));
    }

    const handleDelete = (orderId, productId) => {
        Instance.delete("/api/Order/Delete-Order?orderId=" + orderId + "&productId=" + productId)
            .then(() => {
                toast.success("Delete order success!");
                fetchOrder();
            })
            .catch((err) => console.log(err));
    };

    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                <ToastContainer />
                <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl lg:mx-auto lg:max-w-full">
                    <div className="w-full px-3 min-[400px]:px-6">
                        {orders.map(orderItem => (
                            <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full" key={orderItem.id}>
                                <div className="img-box w-full lg:max-w-[140px]">
                                    <img src={`https://localhost:7118/api/Product/GetImage?name=${orderItem.imageProductName}`}
                                         alt="Premium Watch image" className="aspect-square w-full lg:max-w-[140px]" />
                                </div>
                                <div className="flex flex-row items-center w-full">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                        <div className="flex items-center">
                                            <div>
                                                <h2 className="font-semibold text-xl leading-8 text-black mb-3">{orderItem.productName}</h2>
                                                <div className="flex items-center">
                                                    <p className="font-medium text-base leading-7 text-black">Qty: <span className="text-gray-500">{orderItem.quantity}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-5 gap-3 lg:gap-0">
                                            <div className="col-span-5 lg:col-span-1 flex items-center mt-3 lg:mt-0">
                                                <div className="flex gap-3 lg:block">
                                                    <p className="font-medium text-sm leading-7 text-black">Price</p>
                                                    <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">${orderItem.price}</p>
                                                </div>
                                            </div>
                                            <div className="col-span-5 lg:col-span-2 flex items-center mt-3 lg:mt-0">
                                                <div className="flex gap-3 lg:block">
                                                    <p className="font-medium text-sm leading-7 text-black">Status</p>
                                                    <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">{orderItem.status}</p>
                                                </div>
                                            </div>
                                            <div className="col-span-5 lg:col-span-2 flex items-center mt-3 lg:mt-0">
                                                <div className="flex gap-3 lg:block">
                                                    <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">Expected Delivery Time</p>
                                                    <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">{orderItem.orderDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vô hiệu hóa nút xóa nếu trạng thái không phải là "Pending" */}
                                    {orderItem.status !== 'Pending' &&
                                        <button disabled className="opacity-50 cursor-not-allowed rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400" cx="17" cy="17" r="17" fill="" />
                                                <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white" d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    }
                                    {/* Nút xóa */}
                                    {orderItem.status === 'Pending' &&
                                        <button onClick={() => handleDelete(orderItem.orderId, orderItem.productId)} className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400" cx="17" cy="17" r="17" fill="" />
                                                <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white" d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Order;
