import React, {useEffect, useState} from 'react';
import {Card, CardBody, Typography} from "@material-tailwind/react";
import Instance from "@/configs/instance.js";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
export function Order() {
    const [getOrder, setOrder]= useState([]);
    const navigate= useNavigate()
    const fetchOrder = () => {
        Instance.get("/api/Order/Show-all-orders")
            .then((response) => {
                setOrder(response.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    const handleDeleteOrder = (orderId, productId) => {
        Instance.delete(`/api/Order/Delete-Order?orderId=${orderId}&productid=${productId}`)
            .then(() => {
                toast.success("Delete Order Success");
                fetchOrder();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Delete Order Failed");
            });
    }
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                        <tr>
                            {["#", "Order's email","Product Name" ,"Price","Quantity", "OrderDate","Status","Product Image", "Action"].map((el) => (
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
                        {getOrder.map((order, index) => (
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
                                        {order.productName}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {order.price}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {order.quantity}
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
                                <td className="border-b border-blue-gray-50 py-3 px-5">

                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        <img src={`https://localhost:7118/api/Product/GetImage?name=${order.imageProductName}`}
                                             alt="Product Image" className="w-16 h-16"/>
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5 flex">

                                    <button
                                        onClick={()=>navigate(`edit/${order.orderId}`)}
                                        className="text-xs font-semibold text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-2 rounded"

                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={()=>handleDeleteOrder(order.orderId, order.productId)}
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