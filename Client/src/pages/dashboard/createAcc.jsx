import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Instance from "@/configs/instance.js";
export function CreateAcc() {
    const navigate = useNavigate();
    const [getUserName, setUserName] = useState(null);
    const [getEmail, setEmail] = useState(null);
    const [getPassword, setPassword] = useState('');
    const [getRole, setRole] = useState('user');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: getUserName,
            email: getEmail,
            password: getPassword,
        };

        if (getRole === 'admin') {
            Instance.post("/api/Authenticate/register-admin", data)
                .then(() => {
                    console.log("login admin success");
                    navigate("/dashboard/account");
                })
                .catch((err) => console.log(err));
        } else {
            Instance.post("/api/Authenticate/register", data)
                .then(() => {
                    console.log("login user success");
                    navigate("/dashboard/account");
                })
                .catch((err) => console.log(err));
        }
    };
    return (
        <div>
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
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="password"
                                        value={getPassword}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Rest of the input fields */}
                            <div className="sm:col-span-3">
                                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                    Role
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="role"
                                        name="role"
                                        value={getRole}
                                        onChange={(e) => setRole(e.target.value)}
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
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
        </div>
    );
}

export default CreateAcc;