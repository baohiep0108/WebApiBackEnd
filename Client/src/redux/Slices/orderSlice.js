// Redux Slice cho Order
import { createSlice } from "@reduxjs/toolkit";
import { fetchOrder, fetchOrderForUser,fetchOrderDetails, placeOrder, OrderProduct, UpdateOrder, deleteOrder } from "@/redux/Thunk/order.js";

const initialState = {
    contents: [],
    isLoading: false,
    error: null,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(fetchOrderForUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrderForUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchOrderForUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(fetchOrderDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(placeOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents.push(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(OrderProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(OrderProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents.push(action.payload);
            })
            .addCase(OrderProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(UpdateOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(UpdateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contents = state.contents.filter(order => order.orderId !== action.payload.orderId);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default orderSlice.reducer;
