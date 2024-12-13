import apiSlice from "../../app/apiSlice";

const responseApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllResponses: build.query({
            query: () => ({
                url: "/api/response"
            }),
            providesTags: ["Responses"]

        }),
        addResponse: build.mutation({
            query: (response) => ({
               url: "/api/response",
                method: "POST",
                body: response
            }),
            invalidatesTags: ["Responses"]
        }),
        updateResponse: build.mutation({
            query: (response) => ({
                url: "/api/response",
                method: "PUT",
                body: response
            }),
            invalidatesTags: ["Responses"]
        }),
        deleteResponse: build.mutation({
            query: ({ id }) => ({
                url: `/api/response/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Responses"]
        })
    })

})

export const { useGetAllResponsesQuery,
    useAddResponseMutation,
    useUpdateResponseMutation,
    useDeleteResponseMutation

} = responseApiSlice