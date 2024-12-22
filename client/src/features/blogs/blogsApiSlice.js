import apiSlice from "../../app/apiSlice";

const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllBlogs: build.query({
            query: ({ limit }={}) => ({
                url: `/api/blogs${limit ? `?limit=${limit}` : ''}` // הוספת פרמטר limit אם קיים
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
            query: ({ id }) => ({
                url: `/api/blogs/${id}`,
                method: "DELETE"
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