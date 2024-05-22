import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Instance from "@/configs/instance.js";
import {toast, ToastContainer} from "react-toastify";
export function ProductAd() {
    const navigate= useNavigate()
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetchProduct();
    }, []);
    const fetchProduct = () => {
        Instance
            .get("api/Product/Index")
            .then((response) => {
                setProduct(response.data);
            })
            .catch((err) => console.log(err));
    }
    const handleDeleteProduct=(id)=>{
        Instance.delete(`/api/Product/Delete/${id}`).then(()=>{
            toast.success("Delete Product Success")
           fetchProduct()
        }).catch((err)=>console.log(err))
    }
    const handleEditProduct=(id)=>{
        navigate(`edit/${id}`);
    }
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <Link to="new">
                        <button className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                                type="button">
                            Create new
                        </button>
                    </Link>
                    <ToastContainer/>
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                        <tr>
                            {["#", "Product Name", "Price", "Details", "Status", "Category", "Inventory Number", "Img", "Action"].map((el) => (
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
                        {product.map((product, index) => (
                            <tr key={product.productId}>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {index + 1}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {product.productName}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {product.productPrice}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {product.productDetails}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {product.status}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {product.categoryName}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {product.inventorNumber}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">

                                        <img src={"https://localhost:7118/api/Product/GetImage?name="+product.img} alt="Product Image" className="w-16 h-16" />
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5 flex">

                                    <button
                                        className="text-xs font-semibold text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-2 rounded"
                                        onClick={() => handleEditProduct(product.productId)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded ml-2"
                                        onClick={() => handleDeleteProduct(product.productId)}>

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

export default ProductAd;