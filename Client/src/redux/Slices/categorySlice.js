import { createSlice } from "@reduxjs/toolkit";
import { addCategory, deleteCategory, editCategory, fetchCategory, fetchCategoryById } from "@/redux/Thunk/category.js";

const initialState = {
    contents: [],
    isLoading: false,
    error: null,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.contents.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.contents[index] = action.payload;
                }
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(editCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.contents.findIndex(category => category.categoryId === action.meta.arg.categoryId);
                if (index !== -1) {
                    state.contents[index] = action.payload;
                }
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = state.contents.filter(category => category.categoryId !== action.payload.categoryId);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
