import { createAsyncThunk } from "@reduxjs/toolkit";
import Instance from "@/configs/instance.js";

export const fetchComment = createAsyncThunk(
    'comment/fetchComment',
    async (id) => {
        const response = await Instance.get(`/api/Product/GetAllFeedBack/${id}`);
        return response.data;
    }
);
export const feedbackComment = createAsyncThunk(
    'comment/feedback',
    async ({ id, data }) => {
        const response = await Instance.post(`/api/Product/PostFeedback/${id}`, data);
        return response.data;
    }
);
export const deleteFeedback = createAsyncThunk(
    'comment/deleteFeedback',
    async (id) => {
        const response = await Instance.delete(`/api/Product/DeleteFeedback/${id}`);
        return response.data;
    }
);
