import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Instance from "@/configs/instance.js";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUser} from "@/redux/Thunk/user.js";
export function Account() {
    const dispatch= useDispatch();
    const navigate= useNavigate()
    const { contents: users, isLoading, error } = useSelector(state => state.user);
    useEffect(() => {
        dispatch(fetchAllUser());
    }, [dispatch]);

    const handleDeleteAcc= (id)=>{
        Instance.delete(`/api/Authenticate/delete-user/${id}`)
            .then(()=>{
                fetchUsers()
            })
            .catch((err)=>console.log(err))
    }
    const handleEditAcc = (id) => {
        navigate(`edit/${id}`);
    }

    return(
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <div className="flex justify-between items-center mb-3">
                        <Link to={"createAcc"}>
                        <button
                            className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                            type="button">
                            Create new
                        </button>
                        </Link>
                    </div>
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
                        {users.map((user, index) => (
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
                                        onClick={()=>handleEditAcc(user.id)}
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
