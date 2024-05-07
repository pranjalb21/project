import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
    userBlogs: [],
    userFavourites: []
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
        },
        setDashboard: (state, action)=>{
            state.blogs = action.payload.blogs
            state.favourites = action.payload.favourites
        }
    }
})

export const selectBlogs = state => state.blog.blogs;
export const selectUserBlog = (state) => state.blog.blogs;
export const selectUserFavourite = (state) => state.blog.favourites;
export const { getAllBlogs, addBlog } = blogReducer.actions;
export default blogReducer.reducer;