import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import userProfile from "/public/img/user-profile.jpg";
import {useDispatch, useSelector} from "react-redux";
import { fetchUserById, updateUserImg} from "@/redux/Thunk/user.js";
import AuthIdUser from "@/configs/AuthIdUser.js";
import Instance from "@/configs/instance.js";

function Profile() {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const id = AuthIdUser();
    const dispatch = useDispatch();
    const { contents: user, isLoading, error } = useSelector(state => state.user);
    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id));
        }
    }, [dispatch,id]);
    const handleShowForm = () => {
        setShowForm(true);
    };
    const handleCloseForm = () => {
        setShowForm(false);

    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('Img', selectedImage);
            await Instance.put(`/api/User/UpImg-Profile/${id}`, formData);
            setShowForm(false);
            await dispatch(fetchUserById(id))
        } catch (err) {
            console.error("An error occurred while updating profile image:", err);
        }
    };
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img
                                    src={user.imgProfile ? `${import.meta.env.VITE_PUBLIC_IMG_URL}/api/User/GetImage?name=${user.imgProfile}` : userProfile}
                                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                                    alt="User Profile"
                                />

                                <h1 className="text-xl font-bold">{user.userName}</h1>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <button
                                        type="button"
                                        onClick={handleShowForm}
                                        className="w-36 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                    >
                                        Update Image
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            navigate("/home/editProfile");
                                        }}
                                        className="w-36 bg-amber-300 hover:bg-amber-400 text-white py-2 px-4 rounded"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-7">
                        <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Profile</h2>
                                <div className="flex mb-4">
                                    <span className="text-gray-700 font-bold">Email:</span>
                                    <p className="mx-5">{user.email}</p>
                                </div>
                                <div className="flex mb-4">
                                    <span className="text-gray-700 font-bold">Phone:</span>
                                    <p className="mx-5">{user.phoneNumber}</p>
                                </div>
                                <div className="flex mb-4">
                                    <span className="text-gray-700 font-bold">Gender:</span>
                                    <p className="mx-5">{user.gender}</p>
                                </div>
                                <div className="flex mb-4">
                                    <span className="text-gray-700 font-bold">Date of birth:</span>
                                    <p className="mx-5">{user.dateOfBirth}</p>
                                </div>
                                <div className="flex mb-4">
                                    <span className="text-gray-700 font-bold">Address:</span>
                                    <p className="mx-5">{user.address}</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Update Profile Image</h2>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                                type="file" accept="image/*" className="mb-4"/>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                >
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

export default Profile;
