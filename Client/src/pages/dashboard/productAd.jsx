import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import { deleteProduct, fetchProduct } from "@/redux/Thunk/product.js";
import { useDispatch, useSelector } from "react-redux";

export function ProductAd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { contents: products, isLoading, error } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(fetchProduct());
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage);
        }
    }, [dispatch, location.state]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleDeleteProduct = async (id) => {
        try {
            await dispatch(deleteProduct(id));
            dispatch(fetchProduct())
            toast.success("Product deleted successfully!");
        } catch (err) {
            toast.error("Product delete failed!");
        }
    };

    const handleEditProduct = (id) => {
        navigate(`edit/${id}`);
    };

    const filteredProducts = products.filter(product => {
        return product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <ToastContainer />
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
                <div>
                    <Link to="new">
                        <button
                            className="bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                            type="button">
                            Create new
                        </button>
                    </Link>

                </div>
            </div>
            <Card>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
                        {filteredProducts.map((product, index) => (
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
                                        <img src={`${import.meta.env.VITE_PUBLIC_IMG_URL}/api/Product/GetImage?name=${product.img}`} alt="Product Image" className="w-16 h-16" />
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
