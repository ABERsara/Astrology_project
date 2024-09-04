import apiSlice from "../../app/apiSlice"

const userApiSlice = apiSlice.injectEndpoints(
    {
        endpoints: (build) => ({
            getAllUsers: build.query({
                query: () => ({
                    url: "api/users"
                }),
                providesTags:["users"]

            }),
            // getUser:build.query({
            //     query: ({_id}) => ({
            //         url: "api/user",
            //         method:"GET",
            //         body:{_id}
            //     }),
            //     providesTags:["users"]
            // }),
            addUser:build.mutation({
                query: (user) => ({
                    url: "api/users",
                    method:"POST",
                    body:user
                }),
                invalidatesTags:["users"]
            }),
            updateUser:build.mutation({
                query: (user) => ({
                    url: "api/users",
                    method:"PUT",
                    body:user
                }),
                invalidatesTags:["users"]
            }),
            deleteUser:build.mutation({
                query: (user) => ({
                    url: "api/users",
                    method:"DELETE",
                    body:user
                }),
                invalidatesTags:["users"]
            }),
        })
    }
)

export const {useGetAllUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
useDeleteUserMutation}=userApiSlice