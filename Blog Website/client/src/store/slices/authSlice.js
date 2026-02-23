import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        logout: (state) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            state.user = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    },
});

export const { reset, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
