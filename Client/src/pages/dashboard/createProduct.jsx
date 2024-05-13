import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Instance from "@/configs/instance.js";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState(null);
    const [price, setPrice] = useState(null);
    const [details, setDetails] = useState(null);
    const [inventorNumber, setNumber] = useState(null);
    const [file, setFile] = useState(null);
    const [getCategory, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Instance.get("/api/Category/Index")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', price);
        formData.append('productDetails', details);
        formData.append('inventorNumber', inventorNumber);
        formData.append('categoryId', getCategory);
        formData.append('img', file);
        try {
            await Instance.post("api/Product/Create", formData);
            navigate("/dashboard/product");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Product name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        type="text"
                                        name="product-name"
                                        autoComplete="prodcut-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="country"
                                        autoComplete="Category-name"
                                        value={getCategory}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option value="">Select category</option>
                                        {categories.map(category => (
                                            <option key={category.categoryId}
                                                    value={category.categoryId}>{category.categoryName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Inventor Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={inventorNumber}
                                        onChange={(e) => setNumber(e.target.value)}
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Img
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setFile(e.target.files[0])}
                                        type="file"
                                        name="img"
                                        id="img"
                                        accept="image/*"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Detail
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        typeof="text"
                                        name="details-name"
                                        autoComplete="product-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to={"/dashboard/product"}>
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

export default CreateProduct;
