import {createAsyncThunk} from "@reduxjs/toolkit";
import Instance from "@/configs/instance.js";
export const fetchAllUser = createAsyncThunk(
    'user/fetchAllUser',
    async () => {
        const res = await Instance.get(`/api/Authenticate/get-Acc`);
        return res.data;
    }
);

