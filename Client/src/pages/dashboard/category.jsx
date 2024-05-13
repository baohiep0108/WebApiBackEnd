import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Instance from "@/configs/instance.js";
import {useNavigate} from "react-router-dom";
export  function Category() {
    const [category, setCategory] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const navigate= useNavigate()
    useEffect(() => {
        fetchCategories();
    }, []);
    const fetchCategories = () => {
        Instance
            .get("/api/Category/Index")
            .then((response) => {
                setCategory(response.data);
            })
            .catch((err) => console.log(err));
    };
    const handleDeleteCategory = (categoryId) => {
        Instance
            .delete(`/api/Category/${categoryId}`)
            .then(() => {
                fetchCategories();
            })
            .catch((err) => console.log(err));
    };
    const handCreateCategory = () => {
        const data = { categoryName: newCategoryName }; // Prepare the data to send
        Instance.post('/api/Category/Create', data)
            .then(() => {
                fetchCategories();
            })
            .catch((err) => console.log(err));
    }

    const handleEditCategory = (categoryId) => {
        navigate(`edit/${categoryId}`);
    }
    const handleToggleForm = () => {
        setShowForm(!showForm);
    };
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <button
                                onClick={handleToggleForm}
                                className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                                type="button"
                            >
                                Create new
                            </button>
                        </div>
                        {showForm && (
                            <form className="w-full max-w-sm" onSubmit={handCreateCategory}>
                                <div className="flex items-center border-b border-teal-500 py-2">
                                    <input
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Category Name"
                                        aria-label="Category Name"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                    />
                                    <button
                                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>

                        )}
                    </div>
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                        <tr>
                            {["#", "Category Name", ""].map((el) => (
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
                        {category.map((category, index) => (
                            <tr key={category.categoryId}>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {index + 1}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 py-3 px-5">
                                    <Typography className="text-xs font-semibold text-blue-gray-600">
                                        {category.categoryName}
                                    </Typography>
                                </td>

                                <td className="border-b border-blue-gray-50 py-3 px-5">

                                    <button
                                        className="text-xs font-semibold text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-2 rounded"
                                        onClick={() => handleEditCategory(category.categoryId)}>
                                        Edit
                                    </button>
                                    <button
                                        className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded ml-2"
                                        onClick={() => handleDeleteCategory(category.categoryId)}>
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

export default Category;
