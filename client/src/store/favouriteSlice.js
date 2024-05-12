import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    blogs: []
}

const favouriteReducer = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        setFavourites: (state, action) => {
            state.blogs = action.payload
        },
        deleteFavourite: (state, action) => {
            state.blogs = state.blogs.filter(blog => blog._id !== action.payload)
        }

    }
})

export const selectFavouriteBlogs = (state) => state.favourite.blogs;

export const { setFavourites, deleteFavourite } = favouriteReducer.actions;
export default favouriteReducer.reducer;