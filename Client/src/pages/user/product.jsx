import React, { useEffect, useState } from 'react';
import Instance from "@/configs/instance.js";
import {Spinner} from "@material-tailwind/react";

function Product() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await Instance.get("/api/Category/Index");
                const dataCategory = response.data;
                setCategories(dataCategory);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const promises = categories.map(async (category) => {
                    const response = await Instance.get(`/api/Product/GetProduct-By-Category/${category.categoryId}`);
                    return response.data;
                });
                const productsData = await Promise.all(promises);
                const mergedProducts = productsData.flat();
                setProducts(mergedProducts);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        if (categories.length > 0) {
            fetchProducts();
        }
    }, [categories]);

    return (
        <div className="bg-white flex justify-center items-center min-h-screen">
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spinner className="w-20 h-20" size="large" color="blue" />
                </div>
            ) : (
                <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    {categories.map(category => {
                        const categoryProducts = products.filter(product => product.categoryId === category.categoryId);

                        if (categoryProducts.length === 0) return null;

                        return (
                            <div key={category.categoryId}>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{category.categoryName}</h2>
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                    {categoryProducts.map(product => (
                                        <div key={product.id} className="group relative">
                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                <img src={"https://localhost:7118/api/Product/GetImage?name="+product.img}
                                                     alt={product.productName} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                    <h3 className="text-sm text-gray-700">
                                                        <a href={`home/product/detail/${product.productId}`}>
                                                            <span aria-hidden="true" className="absolute inset-0"/>
                                                            {product.productName}
                                                        </a>
                                                    </h3>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">{product.productPrice}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Product;
