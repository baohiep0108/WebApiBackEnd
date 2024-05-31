import {createAsyncThunk} from "@reduxjs/toolkit";
import Instance from "@/configs/instance.js";
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async () => {
        const res = await Instance.get('/api/Cart/Show-cart');
        return res.data;
    }
);
export const AddCart = createAsyncThunk(
    'cart/AddCart',
    async (id) => {
        const res = await Instance.post(`/api/Cart/Add-Cart/${id}`);
        return res.data;
    }
);
export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async ({ product, quantity }) => {
        const res = await Instance.put(`/api/Cart/Update-Cart?productid=${product}&quantity=${quantity}`);
        return res.data;
    }
);
export const deleteCart = createAsyncThunk(
    'cart/deleteCart',
    async (id) => {
        const res = await Instance.delete(`/api/Cart/Delete-Cart/${id}`);
        return res.data;
    }
);
export const deleteAllCart = createAsyncThunk(
    'cart/deleteAllCart',
    async () => {
        const res = await Instance.delete('/api/Cart/Delete-All-Cart');
        return res.data;
    }
);