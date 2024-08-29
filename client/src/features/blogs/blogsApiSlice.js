import apiSlice from "../../app/apiSlice";

const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllBlogs: build.query({
            query: () => ({
                url: "/api/blogs"
            }),
            providesTags: ["Blogs"]

        }),
        addBlog: build.mutation({
            query: (blog) => ({
                url: "/api/blogs",
                method: "POST",
                body: blog
            }),
            invalidatesTags: ["Blogs"]
        }),
        updateBlog: build.mutation({
            query: (blog) => ({
                url: "/api/blogs",
                method: "PUT",
                body: blog
            }),
            invalidatesTags: ["Blogs"]
        }),
        deleteBlog: build.mutation({
            query: ({ _id }) => ({
                url: "/api/blogs",
                method: "Delete",
                body: { _id }
            }),
            invalidatesTags: ["Blogs"]
        })
    })

})

export const { useGetAllBlogsQuery,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation

} = blogsApiSlice