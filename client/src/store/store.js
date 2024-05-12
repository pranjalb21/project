import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import blogReducer from './blogSlice';
import favouriteReducer from './favouriteSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        blog: blogReducer,
        favourite: favouriteReducer
    }
}) 

export default store;