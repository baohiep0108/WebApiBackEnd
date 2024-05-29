import { createSlice } from "@reduxjs/toolkit";
import {fetchComment, deleteFeedback, feedbackComment} from "@/redux/Thunk/comment.js";

const initialState = {
    contents: [],
    isLoading: false,
    error: null,
};

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
                state.error = null;
            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(feedbackComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(feedbackComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = [...state.contents, action.payload];
                state.error = null;
            })
            .addCase(feedbackComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = state.contents.filter(comment => comment.id !== action.payload.id);
                state.error = null;
            })
            .addCase(deleteFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default commentSlice.reducer;
