import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchUserById } from "@/redux/Thunk/user.js";
import AuthIdUser from "@/configs/AuthIdUser.js";
import Instance from "@/configs/instance.js";

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = AuthIdUser();

    const user = useSelector(state => state.user.contents);
    const isLoading = useSelector(state => state.user.isLoading);
    const error = useSelector(state => state.user.error);

    const [getUserName, setUserName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassWord, setPassWord] = useState('');
    const [getPhone, setPhone] = useState('');
    const [getGender, setGender] = useState('');
    const [getAddress, setAddress] = useState('');
    const [getDateOfBirth, setDateOfBirth] = useState('');

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setUserName(user.userName || '');
            setEmail(user.email || '');
            setGender(user.gender || '');
            setAddress(user.address || '');
            setPhone(user.phoneNumber || '');
            setDateOfBirth(user.dateOfBirth || '');
        }
    }, [user]);

    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        const data = {
            userName: getUserName,
            email: getEmail,
            password: getPassWord,
            gender: getGender,
            address: getAddress,
            dateOfBirth: getDateOfBirth,
            phoneNumber: getPhone
        };
        try {
            await Instance.put(`/api/User/UpdateProfile/${id}`, data)
            toast.success("Profile updated successfully");
            navigate("/home/profile", { state: { message: "Edit Profile Success", style: "success" } });
        } catch (err) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            <div className="max-w-2xl w-full flex flex-col justify-center items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-1200 text-center mb-2">
                    User Profile
                </h3>
                <div className="w-full bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                    <div className="px-4 py-5 sm:px-6">
                        <ToastContainer />
                        <div className="z-auto">
                            <form onSubmit={handleSubmitProfile}>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <label className="text-sm font-medium text-gray-500">
                                        User Name
                                    </label>
                                    <input
                                        value={getUserName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <label className="text-sm font-medium text-gray-500">
                                        Email address
                                    </label>
                                    <input
                                        value={getEmail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <label className="text-sm font-medium text-gray-500">
                                        Gender
                                    </label>
                                    <input
                                        value={getGender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <label className="text-sm font-medium text-gray-500">
                                        Address
                                    </label>
                                    <input
                                        value={getAddress}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <label className="text-sm font-medium text-gray-500">
                                        Phone
                                    </label>
                                    <input
                                        value={getPhone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <label className="text-sm font-medium text-gray-500">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        value={getDateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <label className="text-sm font-medium text-gray-500">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={getPassWord}
                                        onChange={(e) => setPassWord(e.target.value)}
                                        className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" />
                                </div>
                                <Link to="/home/profile">
                                    <button type="button"
                                            className="bottom-0 right-0 bg-red-500 py-2 px-5 mt-4 mr-4 hover:bg-red-700 text-white rounded-sm">Exit
                                    </button>
                                </Link>
                                <button type="submit"
                                        className="bottom-0 right-0 bg-blue-500 py-2 px-5 mt-4 mr-4 hover:bg-blue-700 text-white rounded-sm">Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
