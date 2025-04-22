import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	registerUserApi,
	logoutUserApi,
	getUserApi,
	loginUserApi,
} from '@utils/api';

export const registerUser = createAsyncThunk(
	'user/register',
	async (arg, thunkApi) => {
		try {
			const response = await registerUserApi(arg);
			console.log(response);
			return response;
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);
////
export const logoutUser = createAsyncThunk(
	'user/logout',
	async (arg, thunkApi) => {
		try {
			return await logoutUserApi(arg);
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);
///
export const loginUser = createAsyncThunk(
	'user/login',
	async (arg, thunkApi) => {
		try {
			return await loginUserApi(arg);
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);
////
export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (arg, thunkApi) => {
		try {
			return await getUserApi();
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);
