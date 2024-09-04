import { createSlice } from '@reduxjs/toolkit';

const selectedBlogSlice = createSlice({
  name: 'selectedBlog',
  initialState: null,
  reducers: {
    setSelectedBlog: (state, action) => action.payload,
    clearSelectedBlog: () => null, // פונקציה לנקות את הבלוג הנבחר אם צריך
  },
});

export const { setSelectedBlog, clearSelectedBlog } = selectedBlogSlice.actions;
export default selectedBlogSlice.reducer;
