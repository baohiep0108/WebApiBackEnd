import { createAsyncThunk } from "@reduxjs/toolkit";
import Instance from "@/configs/instance.js";

export const fetchAllUser = createAsyncThunk(
    'user/fetchAllUser',
    async () => {
        const res = await Instance.get(`/api/Authenticate/get-Acc`);
        return res.data;
    }
);

export const fetchUserImg = createAsyncThunk(
    'user/fetchUserImg',
    async (name) => {
        const res = await Instance.get(`/api/User/GetImage?name=${name}`);
        return res.data;
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (data) => {
        const res = await Instance.post(`/api/Authenticate/login`, data);
        return res.data;
    }
);

export const fetchUserByRole = createAsyncThunk(
    'user/fetchUserByRole',
    async (roleName) => {
        const res = await Instance.get(`/api/Authenticate/get-user?user=${roleName}`);
        return res.data;
    }
);

export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async (id) => {
        const res = await Instance.get(`/api/Authenticate/get-user/${id}`);
        return res.data;
    }
);

export const updateUserById = createAsyncThunk(
    'user/updateUserById',
    async ({ id, data }) => {
        const res = await Instance.put(`/api/Authenticate/update-user/${id}`, data);
        return res.data;
    }
);

export const deleteUserById = createAsyncThunk(
    'user/deleteUserById',
    async (id) => {
        const res = await Instance.delete(`/api/Authenticate/delete-user/${id}`);
        return res.data;
    }
);

export const createUser = createAsyncThunk(
    'user/createUser',
    async (data) => {
        const res = await Instance.post(`/api/Authenticate/register`, data);
        return res.data;
    }
);

export const createAdmin = createAsyncThunk(
    'user/createAdmin',
    async (data) => {
        const res = await Instance.post(`/api/Authenticate/register-admin`, data);
        return res.data;
    }
);

export const updateUserImg = createAsyncThunk(
    'user/updateUserImg',
    async ({ id, data }) => {
        const res = await Instance.put(`/api/User/UpdateProfile/${id}`, data);
        return res.data;
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async ({ id, data }) => {
        const res = await Instance.put(`/api/User/UpImg-Profile/${id}`, data);
        return res.data;
    }
);
