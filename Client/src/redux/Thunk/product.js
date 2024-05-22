import { createAsyncThunk } from "@reduxjs/toolkit";
import Instance from "@/configs/instance.js";

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async () => {
        const res = await Instance.get('/api/Product/Index');
        return res.data;
    }
);

export const fetchProductByCategory = createAsyncThunk(
    'product/fetchProductByCategory',
    async (id) => {
        const res = await Instance.get(`/api/Product/GetProduct-By-Category/${id}`);
        return res.data;
    }
);

export const fetchProductById = createAsyncThunk(
    'product/fetchProductById',
    async (id) => {
        const res = await Instance.get(`/api/Product/GetById/${id}`);
        return res.data;
    }
);

export const fetchProductImg = createAsyncThunk(
    'product/fetchProductImg',
    async (name) => {
        const res = await Instance.get(`/api/Product/GetImage?name=${name}`);
        return res.data;
    }
);

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (productData) => {
        const response = await Instance.post('/api/Product/Create', productData);
        return response.data;
    }
);

export const editProduct = createAsyncThunk(
    'product/editProduct',
    async ({ productData, id }) => {
        const response = await Instance.post(`/api/Product/Edit/${id}`, productData);
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id) => {
        const response = await Instance.delete(`/api/Product/Delete/${id}`);
        return response.data;
    }
);
