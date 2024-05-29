import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, fetchOrderForUser } from "@/redux/Thunk/order.js";
import { toast, ToastContainer } from "react-toastify";

function Order() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { contents: order, isLoading, error } = useSelector(state => state.order);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        dispatch(fetchOrderForUser());
    }, [dispatch]);

    const handleDeleteOrder = async (id) => {
        try {
            await dispatch(deleteOrder({ orderId: id }));
            await dispatch(fetchOrderForUser());
            toast.success("Delete Order Success");
        } catch (err) {
            toast.error("Delete Order fail");
            console.error(err);
        }
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case "Pending":
                return (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"/>
                        </svg>
                        {status}
                    </dd>
                );
            case "In transit":
                return (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                        </svg>
                        {status}
                    </dd>
                );
            case "Confirmed":
                return (
                    <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                        <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
                        </svg>
                        {status}
                    </dd>
                );
            default:
                return null;
        }
    };

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <ToastContainer />
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="mx-auto max-w-5xl">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>
                    </div>

                    <div className="mt-6 flow-root sm:mt-8">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {order.map((orderItem) => (
                                <div key={orderItem.id} className="flex flex-wrap items-center gap-y-4 py-6">
                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                            <a href={`/home/order/Details/${orderItem.orderId}`} className="hover:underline">#{orderItem.orderId}</a>
                                        </dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{orderItem.orderDate}</dd>
                                    </dl>

                                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">${orderItem.price}</dd>
                                    </dl>

                                    {renderStatusBadge(orderItem.status)}

                                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                                        {orderItem.status === "Pending" && (
                                            <button type="button"
                                                    onClick={() => handleDeleteOrder(orderItem.orderId)}
                                                    className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 lg:w-auto">
                                                Cancel order
                                            </button>
                                        )}
                                        <a href={`/home/order/Details/${orderItem.orderId}`}
                                           className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                                            <svg className="me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9.5V5.75A2.75 2.75 0 0 0 9.25 3h-5.5A2.75 2.75 0 0 0 1 5.75v8.5A2.75 2.75 0 0 0 3.75 17H7m4-7.5h5.25c.966 0 1.75.784 1.75 1.75v5.5c0 .966-.784 1.75-1.75 1.75H9.25c-.966 0-1.75-.784-1.75-1.75V13m4-3.5-4 4m0 0h3.5m-3.5 0V10"/>
                                            </svg>
                                            Order Details
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Order;
