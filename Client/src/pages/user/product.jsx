import React, { useEffect, useState } from 'react';
import Instance from "@/configs/instance.js";
import { Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {fetchCategory} from "@/redux/Thunk/category.js";
import {useLocation, useNavigate} from "react-router-dom";
import {AddCart, fetchCart} from "@/redux/Thunk/cart.js";
import {toast, ToastContainer} from "react-toastify";

function Product() {
    const navigate= useNavigate()
    const [products, setProducts] = useState([]);
    const location  = useLocation()
    const dispatch = useDispatch();
    useEffect(() => {
        const message = location.state?.message;
        const style = location.state?.style;
        if (message) {
            toast.dismiss();
            if (style === "success") {
                toast.success(message);
            } else {
                toast.error(message);
            }
        }
    }, [location.state]);

    const { contents: category, isLoading, error } = useSelector(state => state.category);
    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const promises = category.map(async (cat) => {
                    const response = await Instance.get(`/api/Product/GetProduct-By-Category/${cat.categoryId}`);
                    return response.data;
                });
                const productsData = await Promise.all(promises);
                const mergedProducts = productsData.flat();
                setProducts(mergedProducts);
            } catch (error) {
                console.log(error);
            }
        };
        if (category.length > 0) {
            fetchProducts();
        }
    }, [category]);
    const handleViewProduct=(id)=>{
        navigate(`/home/product/detail/${id}`)
    }
    const handleAddCart = async (id) => {
        try {
            await dispatch(AddCart(id))
            await dispatch(fetchCart())
            toast.success("Add cart success")
        } catch (err) {
            toast.error(`Add cart fail`);
            err.message();
        }
    }

    return (
        <>
            <ToastContainer/>
        <div className="bg-white flex justify-center items-center min-h-screen">
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <Spinner className="w-20 h-20" size="large" color="blue" />
                </div>
            ) : (

                <div className="font-sans">
                    {category.map((cat) => {
                        const categoryProducts = products.filter((prod) => prod.categoryId === cat.categoryId);

                        if (categoryProducts.length === 0) return null;

                        return (
                            <div key={cat.categoryId} className="p-4 mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl max-w-lg">
                                <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-16">{cat.categoryName}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {categoryProducts.map((prod) => (
                                        <div key={prod.id} className="bg-gray-100 p-2 overflow-hidden cursor-pointer">
                                            <div className="bg-white flex flex-col h-full">
                                                <div onClick={()=>handleViewProduct(prod.productId)}
                                                    className="w-full h-[250px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                                                    <img src={prod.img ?`${import.meta.env.VITE_PUBLIC_IMG_URL}/api/Product/GetImage?name=${prod.img}`:productImg} alt="food1" className="h-full w-full object-cover"/>
                                                </div>
                                                <div className="p-6 text-center flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-600">{prod.productName}</h3>
                                                    <h4 className="text-xl text-gray-600 font-bold mt-2">{prod.productPrice}đ</h4>
                                                </div>
                                                <button
                                                    onClick={()=>handleAddCart(prod.productId)}
                                                    type="button" className="bg-gray-600 font-semibold hover:bg-gray-700 text-white text-sm px-2 py-2.5 w-full">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        </>
    );
}

export default Product;
