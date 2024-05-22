import { createSlice } from "@reduxjs/toolkit";
import {
    fetchProduct,
    fetchProductByCategory,
    fetchProductById,
    fetchProductImg,
    addProduct,
    editProduct,
    deleteProduct
} from "@/redux/Thunk/product.js";

const initialState = {
    contents: [],
    isLoading: false,
    error: null,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchProductByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchProductImg.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.contents.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.contents[index] = action.payload;
                }
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.contents.pop(action.payload)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
