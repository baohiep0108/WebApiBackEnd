    import { createAsyncThunk } from "@reduxjs/toolkit";
    import Instance from "@/configs/instance.js";

    export const fetchCategory = createAsyncThunk(
        'category/fetchCategory',
        async () => {
            const res = await Instance.get('/api/Category/Index');
            return res.data;
        }
    );

    export const fetchCategoryById = createAsyncThunk(
        'category/fetchCategoryById',
        async (id) => {
            const res = await Instance.get(`/api/Category/GetById/${id}`);
            return res.data;
        }
    );

    export const addCategory = createAsyncThunk(
        'category/addCategory',
        async (categoryData) => {
            const response = await Instance.post('/api/Category/Create', categoryData);
            return response.data;
        }
    );

    export const editCategory = createAsyncThunk(
        'category/editCategory',
        async ({ id, categoryData }) => {
            const response = await Instance.put(`/api/Category/Edit/${id}`, categoryData);
            return response.data;
        }
    );
    export const deleteCategory = createAsyncThunk(
        'category/deleteCategory',
        async (id) => {
            const response = await Instance.delete(`/api/Category/Delete-Category/${id}`);
            return response.data;
        }
    );
