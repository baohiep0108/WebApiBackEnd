import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "@/redux/Thunk/category.js";
import { addProduct } from "@/redux/Thunk/product.js";
import { toast } from "react-toastify";

function CreateProduct() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');
    const [file, setFile] = useState(null);
    const [getCategory, setCategory] = useState('');
    const [errors, setErrors] = useState({
        productName: '',
        price: '',
        category: '',
        file: ''
    });
    const dispatch = useDispatch();
    const { contents: category, isLoading, error: categoryError } = useSelector(state => state.category);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!productName.trim()) {
            newErrors.productName = 'Product name is required';
            valid = false;
        } else {
            newErrors.productName = '';
        }

        if (!price.trim()) {
            newErrors.price = 'Price is required';
            valid = false;
        } else {
            newErrors.price = '';
        }

        if (!getCategory.trim()) {
            newErrors.category = 'Category is required';
            valid = false;
        } else {
            newErrors.category = '';
        }


        if (!file) {
            newErrors.file = 'Image is required';
            valid = false;
        } else {
            newErrors.file = '';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', price);
        formData.append('productDetails', details);
        formData.append('categoryId', getCategory);
        formData.append('img', file);
        try {
            await dispatch(addProduct(formData));
            navigate("/dashboard/product");
            toast.success("Product created successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to create product. Please try again.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="product-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        type="text"
                                        name="product-name"
                                        id="product-name"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName}</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="text"
                                        name="price"
                                        id="price"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={getCategory}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                        <option value="">Select category</option>
                                        {category.map(cat => (
                                            <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                                        ))}
                                    </select>
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                                </div>
                            </div>

                            <div className=" sm:col-span-2 sm:col-start-1">
                                <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image
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
                                    {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-5">
                                <label htmlFor="details" className="block text-sm font-medium leading-6 text-gray-900">
                                    Details
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        name="details"
                                        id="details"
                                        autoComplete="off"
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

