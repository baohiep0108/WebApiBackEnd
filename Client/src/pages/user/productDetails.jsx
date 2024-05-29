import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/redux/Thunk/product.js";
import { OrderProduct } from "@/redux/Thunk/order.js";
import {AddCart, fetchCart} from "@/redux/Thunk/cart.js";
import productImg from "/public/img/productImg.png"
import {feedbackComment, fetchComment} from "@/redux/Thunk/comment.js";
import userProfile from "../../../public/img/user-profile.jpg";
import {Textarea} from "@material-tailwind/react";


function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showAllComments, setShowAllComments] = useState(false);
    const [hideCommentsButtonVisible, setHideCommentsButtonVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const dispatch = useDispatch();
    const [star,setStar]= useState('');
    const [comment,setComment]= useState('');
    const { contents: feedback, isFeedBackLoading, FBError } = useSelector(state => state.feedback);
    const { contents: product, isPrLoading, PrError } = useSelector(state => state.product);
    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [id]);

    useEffect(() => {
        dispatch(fetchComment(id))
    }, [id]);

    const BuyNow = async () => {
        await dispatch(OrderProduct(id));
        navigate("/home/checkOut");
    }
    const handleSubmitComment =()=>{
        const data= {
            start: star,
            comment: comment
        }
        dispatch(feedbackComment({id, data}))
    }
    const hideComment = () => {
        setShowAllComments(false);
        setHideCommentsButtonVisible(false);

    };
    const showComment = () => {
            setShowAllComments(true);
        setHideCommentsButtonVisible(true);
    };

    const AddToCart = async () => {
        try {
            await dispatch(AddCart(id));
            await dispatch(fetchCart())
            toast.success("Add cart success")
        } catch (err) {
            toast.error("error");
        }
    }
    const handleShowForm=()=>{
        setShowForm(true)
    }
    const handleCloseForm=()=>{
        setShowForm(false)
    }
    const calculateAverageRating = (feedback) => {
        if (feedback.length === 0) return 0;
        const sum = feedback.reduce((total, feedbackItem) => total + feedbackItem.start, 0);
        return (sum / feedback.length).toFixed(1);
    };

    const renderStarRating = (averageRating) => {
        const numberOfFullStars = Math.floor(averageRating);
        const hasHalfStar = averageRating % 1 !== 0;
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < numberOfFullStars) {
                stars.push(
                    <svg key={i} className="w-5 fill-[#333]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                    </svg>
                );
            } else if (hasHalfStar && i === numberOfFullStars) {
                stars.push(
                    <svg key={i} className="w-5 fill-[#333]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <div className="font-sans bg-white">
            <ToastContainer/>
            <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                <div
                    className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <img
                                src={product.img ? `${import.meta.env.VITE_PUBLIC_IMG_URL}/api/Product/GetImage?name=${product.img}` : productImg}
                                alt="Product" className="w-4/5 rounded object-cover"/>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-[#333]">{product.productName}</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <p className="text-[#333] text-3xl font-bold">${product.productPrice}</p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                            {renderStarRating(calculateAverageRating(feedback))}
                            <h4 className="text-[#333] text-base">{feedback.length} Reviews</h4>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-10">
                            <button type="button" onClick={BuyNow}
                                    className="min-w-[200px] px-4 py-3 bg-[#333] hover:bg-[#111] text-white text-sm font-semibold rounded">Buy
                                now
                            </button>
                            <button type="button" onClick={AddToCart}
                                    className="min-w-[200px] px-4 py-2.5 border border-[#333] bg-transparent hover:bg-gray-50 text-[#333] text-sm font-semibold rounded">Add
                                to cart
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <h3 className="text-lg font-bold text-[#333]">Product information</h3>
                    <div className="mt-6 space-y-6 text-[#333]">
                        <span className="text-sm ml-4">{product.productDetails}</span>
                    </div>
                </div>
                <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <h3 className="text-lg font-bold text-[#333]">Reviews ({feedback.length})</h3>
                    <div className="grid md:grid-cols-1 gap-12 mt-6">
                        {showAllComments ?
                            feedback.map((feedbackItem, index) => (
                                <div key={index} className="flex items-start">
                                    <img
                                        alt="img"
                                        src={feedbackItem.imgProfile ? `${import.meta.env.VITE_PUBLIC_IMG_URL}/api/User/GetImage?name=${feedbackItem.imgProfile}` : userProfile}
                                        className="w-12 h-12 rounded-full border-2 border-white"/>
                                    <div className="ml-3">
                                        <h4 className="text-sm font-bold text-[#333]">{feedbackItem.userName}</h4>
                                        <div className="flex space-x-1 mt-1">
                                            {[...Array(feedbackItem.start)].map((_, i) => (
                                                <svg key={i} className="w-4 fill-[#333]" viewBox="0 0 14 13" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-sm mt-4 text-[#333]">{feedbackItem.comment}</p>
                                    </div>
                                </div>
                            ))
                            :
                            feedback.slice(0, 2).map((feedbackItem, index) => (
                                <div key={index} className="flex items-start">
                                    <img
                                        src={feedbackItem.imgProfile ? `${import.meta.env.VITE_PUBLIC_IMG_URL}/api/User/GetImage?name=${feedbackItem.imgProfile}` : userProfile}
                                        alt="img profile"
                                        className="w-12 h-12 rounded-full border-2 border-white"/>
                                    <div className="ml-3">
                                        <h4 className="text-sm font-bold text-[#333]">{feedbackItem.userName}</h4>
                                        <div className="flex space-x-1 mt-1">
                                            {[...Array(feedbackItem.start)].map((_, i) => (
                                                <svg key={i} className="w-4 fill-[#333]" viewBox="0 0 14 13" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"/>
                                                </svg>
                                            ))}
                                            <p className="text-xs !ml-2 font-semibold text-[#333]">2 min ago</p>
                                        </div>
                                        <p className="text-sm mt-4 text-[#333]">{feedbackItem.comment}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {!showAllComments && feedback.length > 2 && (
                        <button type="button" onClick={() => showComment()}
                                className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-[#333] text-[#333] font-bold rounded">Read
                            all reviews</button>
                    )}
                    {hideCommentsButtonVisible && (
                        <>
                            <button type="button"
                                    onClick={()=>handleShowForm()}
                                    className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-[#333] text-[#333] font-bold rounded">
                                FeedBack
                            </button>

                            <button type="button" onClick={() => hideComment()}
                                    className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-[#333] text-[#333] font-bold rounded">Hide
                                comments
                            </button>
                        </>
                    )}
                </div>
            </div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Feedback products</h2>
                        <form onSubmit={handleSubmitComment}>
                            <div className="my-4">
                                <label htmlFor="minmax-range"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Star</label>
                                <input id="minmax-range" type="range" min="1" max="5"
                                       value={star}
                                       onChange={(e)=>setStar(e.target.value)}
                                       className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
                                       disabled={false}/>
                            </div>

                            <Textarea
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                                label="Comment"
                                color="neutral"
                                disabled={false}
                                minRows={2}
                                size="lg"
                                variant="soft"
                                className="mb-4"
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}
        </div>
    );
}

export default ProductDetails;
