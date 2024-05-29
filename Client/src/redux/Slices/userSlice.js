import { createSlice } from "@reduxjs/toolkit";
import {
    fetchAllUser,
    fetchUserImg,
    fetchUserByRole,
    fetchUserById,
    updateUserById,
    deleteUserById,
    createUser,
    createAdmin,
    updateUserImg,
    updateUserProfile
} from "@/redux/Thunk/user.js";

const initialState = {
    contents: [],
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserImg.fulfilled, (state, action) => {
                state.isLoading = false;
                const userIndex = state.contents.findIndex(user => user.name === action.meta.arg);
                if (userIndex !== -1) {
                    state.contents[userIndex].img = action.payload;
                }
            })
            .addCase(fetchUserImg.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserByRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserByRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchUserByRole.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                const userIndex = state.contents.findIndex(user => user.id === action.meta.arg.id);
                if (userIndex !== -1) {
                    state.contents[userIndex] = action.payload;
                }
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents.pop(action.payload);
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(createAdmin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents.push(action.payload);
            })
            .addCase(createAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserImg.fulfilled, (state, action) => {
                state.isLoading = false;
                const userIndex = state.contents.findIndex(user => user.id === action.meta.arg.id);
                if (userIndex !== -1) {
                    state.contents[userIndex].img = action.payload;
                }
            })
            .addCase(updateUserImg.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                const userIndex = state.contents.findIndex(user => user.id === action.meta.arg.id);
                if (userIndex !== -1) {
                    state.contents[userIndex] = action.payload;
                }
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
