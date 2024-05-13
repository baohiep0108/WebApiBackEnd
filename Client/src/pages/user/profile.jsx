import React, { useEffect, useState } from 'react';
import Instance from "@/configs/instance.js";
import AuthIdUser from "@/configs/AuthIdUser.js";
import { Link } from "react-router-dom";

function Profile() {
    const [userData, setUserData] = useState(null);
    const id = AuthIdUser();

    const fetchUser = () => {
        Instance.get(`/api/Authenticate/get-user/${id}`)
            .then((response) => {
                const dataUser = response.data;
                setUserData(dataUser);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div className="bg-gray-50 min-h-screen flex justify-center">
            <div className="max-w-2xl w-full flex flex-col justify-center items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-700 text-center mb-2">
                    User Profile
                </h3>
                <div className="mx-auto w-64 text-center mb-52">
                    <div className="relative w-64">

                        <img className="w-64 h-64 rounded-full absolute"
                             src={`https://localhost:7118/api/UserProfile/GetImage?name=${userData && userData.imgProfile}`}
                             alt=""/>
                    </div>
                </div>
                <div className="w-full bg-white shadow overflow-hidden sm:rounded-lg mb-8 mt-10">
                    <div className="px-4 py-5 sm:px-6">

                        <div className="z-auto ">
                            {userData && (
                                <>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            User Name
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {userData.userName}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Email address
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {userData.email}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Gender
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {userData.gender}
                                        </dd>
                                    </div>
                                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Address
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {userData.address}
                                        </dd>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Phone
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {userData.phoneNumber}
                                        </dd>
                                    </div>
                                </>
                            )}
                        </div>
                        <Link to="/home/EditProfile">
                            <button type="button"
                                    className="bottom-0 right-0 bg-blue-500 py-2 px-5 mt-4 mr-4 hover:bg-blue-700 text-white rounded-sm">Edit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
