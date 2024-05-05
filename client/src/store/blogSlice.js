import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: []
}

const blogReducer = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getAllBlogs: (state, action)=>{
            state.blogs = action.payload;
        },
        addBlog: (state,action)=>{
            state.blogs.push(action.payload);
        }
    }
})

export const selectBlogs = state => state.blog.blogs;
export const { getAllBlogs, addBlog } = blogReducer.actions;
export default blogReducer.reducer;