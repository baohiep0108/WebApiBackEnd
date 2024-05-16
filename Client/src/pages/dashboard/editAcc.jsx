import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Instance from "@/configs/instance.js";
import {toast, ToastContainer} from "react-toastify";

function EditAcc() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [getUserName, setUserName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getPhoneNumber,setPhoneNumber]= useState('');
    const  [getAddress, setAddress]= useState('');

    useEffect(() => {
        Instance.get(`/api/Authenticate/get-user/${id}`)
            .then(response => {
                const userData = response.data;
                setUserName(userData.userName);
                setEmail(userData.email);
                setAddress(userData.address)
                setPhoneNumber(userData.phoneNumber)
            })
            .catch(error => console.log(error));
    }, [id]);
    const data={
        userName: getUserName,
        passwordHash: getPassword,
        phoneNumber: getPhoneNumber,
        email: getEmail,
        address: getAddress,
    }
    const handleSubmit = () => {
        Instance.put(`/api/Authenticate/Update-user/${id}`, data)
            .then(()=>{
                toast.success("User updated successfully");
                navigate("/dashboard/account")
            })
            .catch((err)=>console.log(err))
    }
    return (
        <>
            <ToastContainer/>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    User Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={getUserName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={getEmail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="Address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="Address"
                                        name="Address"
                                        type="text"
                                        value={getAddress}
                                        onChange={(e) => setAddress(e.target.value)}
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="Address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="Address"
                                        name="Address"
                                        type="text"
                                        value={getPhoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={getPassword}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">


                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => navigate("/dashboard/account")}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    );
}

export default EditAcc;