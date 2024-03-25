import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:2024"
    }),
    endpoints:()=>({})
})
export default apiSlice