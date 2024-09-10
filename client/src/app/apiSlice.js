import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl:"http://localhost:2024",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
        headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})
const apiSlice=createApi({
    reducerPath:"api",
    baseQuery,
    endpoints:()=>({})
})
export default apiSlice
