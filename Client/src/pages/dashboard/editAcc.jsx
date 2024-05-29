import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUserById } from '@/redux/Thunk/user';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EditAcc() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.contents.find(user => user.id === id));
    const [getUserName, setUserName] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [getPhoneNumber, setPhoneNumber] = useState('');
    const [getAddress, setAddress] = useState('');

    const [errors, setErrors] = useState({
        userName: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if (user) {
            setUserName(user.userName);
            setEmail(user.email);
            setAddress(user.address);
            setPhoneNumber(user.phoneNumber);
        } else {
            dispatch(fetchUserById(id));
        }
    }, [dispatch, id, user]);

    const validate = () => {
        const newErrors = { userName: '', email: '', phoneNumber: '' };

        if (!/^\S+$/.test(getUserName)) {
            newErrors.userName = "Username should not contain spaces.";
        }

        if (!/^\d+$/.test(getPhoneNumber)) {
            newErrors.phoneNumber = "Phone number should contain only digits.";
        }

        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(getEmail)) {
            newErrors.email = "Invalid email format.";
        }

        setErrors(newErrors);

        return !newErrors.userName && !newErrors.email && !newErrors.phoneNumber;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const data = {
            userName: getUserName,
            passwordHash: getPassword,
            phoneNumber: getPhoneNumber,
            email: getEmail,
            address: getAddress,
        };

        dispatch(updateUserById({ id, data }))
            .then(() => {
                toast.success("Account edited successfully!");
                navigate("/dashboard/account", { state: { toastMessage: "Account edited successfully!" } });
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to update user. Please try again.");
            });
    };

    return (
        <>
            <ToastContainer />
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
                                    {errors.userName && <p className="mt-2 text-sm text-red-600">{errors.userName}</p>}
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
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={getAddress}
                                        onChange={(e) => setAddress(e.target.value)}
                                        autoComplete="address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={getPhoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        autoComplete="phone"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={getPassword}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate("/dashboard/account", { state: { toastMessage: "Edit cancelled." } })}>
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
