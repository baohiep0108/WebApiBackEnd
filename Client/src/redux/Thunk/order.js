import { createAsyncThunk } from "@reduxjs/toolkit";
import Instance from "@/configs/instance.js";

export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    async () => {
        const res = await Instance.get('/api/Order/Show-all-orders');
        return res.data;
    }
);
export const fetchOrderForUser = createAsyncThunk(
    'order/fetchOrderForUser',
    async (id) => {
        const res = await Instance.get(`/api/Order/Show-order`);
        return res.data;
    }
);
export const fetchOrderDetails = createAsyncThunk(
    'order/fetchOrderDetails',
    async (id) => {
        const res = await Instance.get(`/api/Order/Show-Order-Details/${id}`);
        return res.data;
    }
);

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async () => {
        const res = await Instance.post('/api/Order/Place-Order');
        return res.data;
    }
);

export const OrderProduct = createAsyncThunk(
    'order/OrderProduct',
    async (productId) => {
        const res = await Instance.post(`/api/Order/Order-Now?productid=${productId}`);
        return res.data;
    }
);
export const UpdateOrder = createAsyncThunk(
    'order/UpdateOrder',
    async ({ orderId, status }) => {
        const res = await Instance.put(`/api/Order/Update-Order-Status?orderId=${orderId}&status=${status}`);
        return res.data;
    }
);

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async ({orderId}) => {
        const res = await Instance.delete(`/api/Order/Delete-Order/${orderId}`);
        return res.data;
    }
);
