import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import selectedBlogReducer from "../features/blogs/selectedBlogSlice"
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        selectedBlog: selectedBlogReducer //הוספת הblogReducer לstore
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});




export default store;
