import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    token: '',
    user: '',
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user
            localStorage.setItem('token', action.payload.token);
        },
        userLogout: (state, action) => {
            state.isLoggedIn = false;
            state.token = '';
            state.user = ''
            localStorage.removeItem('token');
        },
        setUser: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user
        }
    }
})

export const selectLogin = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export const { userLogin, userLogout } = authReducer.actions;
export default authReducer.reducer;