import apiSlice from "../../app/apiSlice";

const responseApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllResponses: build.query({
            query: () => ({
                url: "/api/responses"
            }),
            providesTags: ["Responses"]

        }),
        addResponse: build.mutation({
            query: (response) => ({
               url: "/api/responses",
                method: "POST",
                body: response
            }),
            invalidatesTags: ["Responses"]
        }),
        updateResponse: build.mutation({
            query: (response) => ({
                url: "/api/responses",
                method: "PUT",
                body: response
            }),
            invalidatesTags: ["Responses"]
        }),
        deleteResponse: build.mutation({
            query: ({ id }) => ({
                url: `/api/responses/${id}`,
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