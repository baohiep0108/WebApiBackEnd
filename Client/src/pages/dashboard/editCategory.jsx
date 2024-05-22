import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editCategory, fetchCategoryById } from "@/redux/Thunk/category.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function EditCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [newCategoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await dispatch(fetchCategoryById(id)).unwrap();
                setCategoryName(response.categoryName);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch category data.");
            }
        };

        fetchCategory();
    }, [dispatch, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(editCategory({ id, categoryData: { categoryName: newCategoryName } })).unwrap();
            navigate("/dashboard/category", { state: { toastMessage: "Category edited successfully!" } });
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        }
    }

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-2">
                                <label htmlFor="category-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category Name
                                </label>
                                <div className="mt-4">
                                    <input
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        value={newCategoryName}
                                        type="text"
                                        name="category-name"
                                        id="category-name"
                                        autoComplete="category-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to="/dashboard/category">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                    </Link>
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

export default EditCategory;
