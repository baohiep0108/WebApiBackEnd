import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, fetchOrder } from "@/redux/Thunk/order.js";
import { deleteCategory } from "@/redux/Thunk/category.js";

export function Order() {
    const dispatch = useDispatch();
    const { contents: order, isLoading, error } = useSelector(state => state.order);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    const handleDeleteOrder = async (productId, orderId) => {
        try {
            await dispatch(deleteOrder({ productId, orderId })).unwrap();
            toast.success("Order deleted successfully!");
            dispatch(fetchOrder());
        } catch (err) {
            toast.error("Order delete failed!");
        }
    };
    const filteredOrder = order.filter(order => {
        return order.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
            </div>
            <Card>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                        <tr>
                            {["#", "Order's email", "Price", "OrderDate", "Status", "Action"].map((el) => (
                                <th
                                    key={el}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <ToastContainer/>
                        {filteredOrder.map((order, index) => (
                            <tr key={order.orderId}>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {index + 1}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {order.userEmail}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {order.price}
                                    </Typography>
                                </td>

                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {order.orderDate}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {order.status}
                                    </Typography>
                                </td>

                                <td className="border-b border-blue-gray-50 py-3 px-5 flex">
                                    <button
                                        onClick={() => navigate(`edit/${order.orderId}`)}
                                        className="text-xs font-semibold text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteOrder(order.productId, order.orderId)}
                                        className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded ml-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default Order;
