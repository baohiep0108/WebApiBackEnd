import React, {useEffect, useState} from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser, deleteUserById } from "@/redux/Thunk/user.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { contents: users, isLoading, error } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredAcc = users.filter(users => {
        return users.userName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    useEffect(() => {
        dispatch(fetchAllUser());
        if (location.state?.toastMessage) {
            toast.success(location.state.toastMessage);
        }
    }, [dispatch, location.state]);
    const handleDeleteAcc = (id) => {
        dispatch(deleteUserById(id))
            .then(() => {
                toast.success("User deleted successfully!");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to delete user. Please try again.");
            });
    }

    const handleEditAcc = (id) => {
        navigate(`edit/${id}`);
    }
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <ToastContainer/>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <Link to={"createAcc"}>
                        <button
                            className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                            type="button">
                            Create new
                        </button>
                    </Link>
                </div>
            </div>
            <Card>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                        <tr>
                            {["#", "Name", "Email", "Phone", "Address", "Action"].map((el) => (
                                <th
                                    key={el}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAcc.map((user, index) => (
                            <tr key={user.id}>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {index + 1}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {user.userName}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {user.email}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {user.phoneNumber}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {user.address}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5 flex">
                                    <button
                                        className="text-xs font-semibold text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-2 rounded"
                                        onClick={() => handleEditAcc(user.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded ml-2"
                                        onClick={() => handleDeleteAcc(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default Account;
