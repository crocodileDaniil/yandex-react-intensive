import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	registerUserApi,
	logoutUserApi,
	getUserApi,
	loginUserApi,
	editingProfileUserApi,
} from '@utils/api';

export const registerUser = createAsyncThunk(
	'user/register',
	async (arg, thunkApi) => {
		try {
			const response = await registerUserApi(arg);

			if (!response.success) {
				return thunkApi.rejectWithValue(
					response.message ?? 'Неизвестная ошибка'
				);
			}
			return response;
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);

export const logoutUser = createAsyncThunk(
	'user/logout',
	async (arg, thunkApi) => {
		try {
			const data = await logoutUserApi(arg);

			return data;
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);

export const loginUser = createAsyncThunk(
	'user/login',
	async (arg, thunkApi) => {
		try {
			const data = await loginUserApi(arg);
			if (!data.success) {
				return thunkApi.rejectWithValue(data.message ?? 'Неизвестная ошибка');
			}

			return data.user;
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);

export const checkUserAuth = createAsyncThunk(
	'user/checkUserAuth',
	async (arg, thunkApi) => {
		try {
			const response = await getUserApi();
			if (!response.success) return thunkApi.rejectWithValue(response.message);
			return response;
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);

export const editProfileUser = createAsyncThunk(
	'user/editProfileUser',
	async (arg, thunkApi) => {
		try {
			const response = await editingProfileUserApi(arg);
			if (!response.success) return thunkApi.rejectWithValue(response.message);

			return response.user;
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);
