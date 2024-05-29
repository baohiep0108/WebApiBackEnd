import { createSlice } from "@reduxjs/toolkit";
import { AddCart, deleteAllCart, deleteCart, fetchCart, updateCart } from "@/redux/Thunk/cart.js";

const initialState = {
    contents: [],
    isLoading: false,
    error: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(AddCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(AddCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteAllCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAllCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
                state.error = null;
            })
            .addCase(deleteAllCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;
