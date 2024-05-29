import React, {useEffect, useState} from 'react';
import AuthIdUser from "@/configs/AuthIdUser.js";
import Instance from "@/configs/instance.js";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

function EditProfile() {
    const navigate= useNavigate()
    const id = AuthIdUser();
    const [getUpImg, setUpImg] = useState(null);
    const [getUserName, setUserName]= useState(null);
    const [getEmail,setEmail]= useState(null);
    const [getPassWord, setPassWord]= useState(null);
    const [getPhone, setPhone]= useState(null);
    const [getGender,setGender]= useState(null);
    const [getAddress,setAddress]= useState(null);
    const [getDateOfBirth,setDateOfBirth]= useState(null);

    const data={
        userName: getUserName,
        email: getEmail,
        password: getPassWord,
        gender: getGender,
        address: getAddress,
        dateOfBirth: getDateOfBirth,
        phoneNumber: getPhone
    }
    const fetchUser = () => {
        Instance.get(`/api/Authenticate/get-user/${id}`)
            .then((response) => {
                const dataUser = response.data;
                setUserName(dataUser.userName);
                setEmail(dataUser.email);
                setGender(dataUser.gender)
                setAddress(dataUser.address);
                setPhone(dataUser.phoneNumber);
                setDateOfBirth(dataUser.dateOfBirth)
            })
            .catch((error) => console.log(error));
    }
    useEffect(() => {
        fetchUser();
    }, []);
            const handleSubmitImg = (e) => {
                e.preventDefault();
                if (!getUpImg) {
                    console.log("Please select an image.");
                    return;
                }
                const formData = new FormData();
                formData.append('Img', getUpImg);
                Instance.put(`/api/User/UpImg-Profile/${id}`, formData)
                    .then(() => {
                        console.log("Upload success");
                        toast.success("Uploand image success ")
                        fetchUser();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            const handleSubmitProfile =()=>{
                Instance.put(`/api/User/UpdateProfile/${id}`,data)
                    .then(()=> {
                        toast.success("Update file successful")
                        fetchUser();
                        navigate("/home");
                    })
                    .catch((err) => console.log(err))
            }
            return (
                <div className="bg-gray-50 min-h-screen flex justify-center">
                    <div className="max-w-2xl w-full flex flex-col justify-center items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-1200 text-center mb-2">
                            User Profile
                        </h3>
                        <div className="w-full bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                            <div className="px-4 py-5 sm:px-6">
                                <ToastContainer/>
                                <div className="z-auto">

                                    <form onSubmit={handleSubmitProfile}>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <label className="text-sm font-medium text-gray-500">
                                                User Name
                                            </label>
                                            <input
                                                value={getUserName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <label className="text-sm font-medium text-gray-500">
                                                Email address
                                            </label>
                                            <input
                                                value={getEmail}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
                                        </div>
                                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <label className="text-sm font-medium text-gray-500">
                                                Gender
                                            </label>
                                            <input
                                                value={getGender}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>

                                        </div>

                                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <label className="text-sm font-medium text-gray-500">
                                                Address
                                            </label>
                                            <input
                                                value={getAddress}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <label className="text-sm font-medium text-gray-500">
                                                Phone
                                            </label>
                                            <input
                                                value={getPhone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <label className="text-sm font-medium text-gray-500">
                                                Date of Birth
                                            </label>
                                            <input
                                                type="date"
                                                value={getDateOfBirth}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <label className="text-sm font-medium text-gray-500">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                value={getPassWord}
                                                onChange={(e) => setPassWord(e.target.value)}
                                                className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"/>
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