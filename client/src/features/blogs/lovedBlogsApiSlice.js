import apiSlice from "../../app/apiSlice";

const lovedBlogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserLovedBlogs: builder.query({
      query: (id) => ({
        url:`/api/loved-blogs/${id}`,
      }),
      providesTags: ["LovedBlogs"]
    }),
    addLovedBlog: builder.mutation({
      query: ({ userId, blogId }) => ({
        url: 'api/loved-blogs',
        method: 'POST',
        body: { userId, blogId },
      }),
      invalidatesTags: ["LovedBlogs"]
    }),
    removeLovedBlog: builder.mutation({
      query: ({ userId, blogId }) => ({
        url: 'api/loved-blogs',
        method: 'DELETE',
        body: { userId, blogId },
      }),
       invalidatesTags: ["LovedBlogs"]
    }),
  }),
});

export const {
  useGetUserLovedBlogsQuery,
  useAddLovedBlogMutation,
  useRemoveLovedBlogMutation,
} = lovedBlogsApiSlice;
