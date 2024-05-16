import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Instance from "@/configs/instance.js";
import {toast, ToastContainer} from "react-toastify";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const fetchProduct = () => {
        Instance.get(`/api/Product/GetById/${id}`)
            .then((response) => {
                setProduct(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        fetchProduct();
    }, [id]);
    const addOrder=()=>{
        Instance.post(`/api/Order/Order-Now?productid=${id}`)
            .then(()=>{
                toast.success("Order Success")
        }).catch((err)=>{
            toast.error("Order failed")
            console.log(err)})
    }
    const addCart=()=>{
        Instance.post(`/api/Cart/Add-Cart/${id}`).then(()=>{
            toast.success("Add to cart successfully")
        }).catch((err)=>{
            toast.error("Add to cart failed")
            console.log(err);})
    }
    return (

        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl tems-center justify-between rounded-3xl md:px-24 lg:px-8 font-sans bg-gray-700">
            <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">

                <ToastContainer/>
                {product && (
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                            <div className="bg-white-800 px-4 py-10 rounded-xl">
                                <img src={"https://localhost:7118/api/Product/GetImage?name="+product.img}
                                     alt="Product"
                                     className="w-4/5 rounded object-cover mx-auto" />
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-semibold text-white">{product.productName}</h2>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <p className="text-white text-4xl font-semibold">${product.productPrice}</p>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <button
                                    onClick={addOrder}
                                    type="button" className="min-w-[200px] px-4 py-3 bg-yellow-300 hover:bg-yellow-400 text-black text-sm font-semibold rounded">Buy now</button>
                                <button
                                    onClick={addCart}
                                    type="button" className="min-w-[200px] px-4 py-2.5 border border-yellow-300 bg-transparent text-yellow-300 text-sm font-semibold rounded">Add to cart</button>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-white">About the product</h3>
                                <span className="space-y-3 list-disc mt-4 pl-4 text-sm text-white">
                                    {product.productDetails}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
