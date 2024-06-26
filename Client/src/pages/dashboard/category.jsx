import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, fetchCategory } from "@/redux/Thunk/category.js";

export function Category() {
    const [newCategoryName, setNewCategoryName] = useState('');
    const location = useLocation();
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { contents: category, isLoading, error } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const message = location.state?.message;
        const style = location.state?.style;
        if (message) {
            toast.dismiss();
            if (style === "success") {
                toast.success(message);
            } else {
                toast.error(message);
            }
        }
    }, [location.state]);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (newCategoryName.trim() === '') {
            toast.error("Category name cannot be empty!");
            return;
        }
        const isDuplicate = category.some(cat => cat.categoryName.toLowerCase() === newCategoryName.toLowerCase());
        if (isDuplicate) {
            toast.error("Category name already exists!");
            return;
        }
        try {
            await dispatch(addCategory({ categoryName: newCategoryName }));
            toast.success("Category added successfully!");

            setNewCategoryName('');
            dispatch(fetchCategory());
            setShowForm(false);
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }
    };

    const filteredCategory = category.filter(category => {
        return category.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleEditCategory = (categoryId) => {
        navigate(`edit/${categoryId}`);
    };

    const handleDeleteCategory = async (id) => {
        try {
            await dispatch(deleteCategory(id));
            dispatch(fetchCategory());
            toast.success("Category deleted successfully!");
        } catch (err) {
            toast.error("Category delete failed!");
        }
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
    };


    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <ToastContainer/>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <input
                        type="text"
                        placeholder="Search by category name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    {!showForm && (
                    <div className="flex justify-between items-center mb-3">
                        <button
                            onClick={handleToggleForm}
                            className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
                            type="button"
                        >
                            Create new
                        </button>
                    </div>
                    )}
                    {showForm && (
                        <form className="w-full max-w-sm" onSubmit={handleCreateCategory}>
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
            </div>
            <Card>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
                        {filteredCategory.map((category, index) => (
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
                                <td className="border-b border-blue-gray-50 py-3 px-5 flex">
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
