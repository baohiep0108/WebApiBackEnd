import {configureStore} from "@reduxjs/toolkit";
import productReducer from "@/redux/Slices/productSlice.js"
import categoryReducer from "@/redux/Slices/categorySlice.js";
import userReducer from "@/redux/Slices/userSlice.js";
import orderReducer from "@/redux/Slices/orderSlice.js";
import cartReducer from "@/redux/Slices/cartSlice.js";
import feedBackReducer from "@/redux/Slices/commentSlice.js";
export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        order: orderReducer,
        user: userReducer,
        cart:cartReducer,
        feedback: feedBackReducer,

    },
});