import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import selectedBlogReducer from "../features/blogs/selectedBlogSlice"
import authReducer from "../features/auth/authSlice"
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        selectedBlog: selectedBlogReducer, //הוספת הblogReducer לstore
        auth: authReducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(apiSlice.middleware),
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: true,

});




export default store;
