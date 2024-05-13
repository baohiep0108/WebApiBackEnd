import React, {useEffect, useState} from 'react';
import { Link, useParams } from "react-router-dom";
import Instance from "@/configs/instance.js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export function EditCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState(null);


    useEffect(() => {
        Instance.get(`api/Category/GetById/${id}`,)
            .then(response => {
                const userData = response.data;
                setCategory(userData.categoryName)
            })
            .catch(error => console.log(error));
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        Instance.put(`api/Category/Edit/${id}`, { categoryName: category })
            .then(() => {
                navigate("/dashboard/category");

            }).catch((err) => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category Name
                                </label>
                                <div className="mt-2">
                                    <input

                                        onChange={(e) => setCategory(e.target.value)}
                                        value={category}
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to={"/dashboard/category"}>
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                    </Link>
                    <div>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                        </button>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditCategory;
