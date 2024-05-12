import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
    userBlogs: []
}

const blogReducer = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getAllBlogs: (state, action)=>{
            state.blogs = action.payload;
        },
        addBlog: (state,action)=>{
            state.blogs.push(action.payload.data);
        },
        setDashboard: (state, action)=>{
            state.userBlogs = action.payload.blogs
        }
    }
})

export const selectBlogs = state => state.blog.blogs;
export const selectUserBlog = (state) => state.blog.userBlogs;

export const { getAllBlogs, addBlog, setDashboard } = blogReducer.actions;
export default blogReducer.reducer;