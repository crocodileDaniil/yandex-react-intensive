import { createAsyncThunk } from '@reduxjs/toolkit';
import { postPlaceOrderApi } from '@utils/api';

export const postPlaceOrder = createAsyncThunk(
	'order/postPlaceOrder',
	async (arg, thunkApi) => {
		try {
			console.log(arg)
			return await postPlaceOrderApi(arg);
		} catch (e) {
			return thunkApi.rejectWithValue(e.message || 'Неизвестная ошибка');
		}
	}
);
