import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllIngredientsApi } from '@utils/api';

export const getAllIngredients = createAsyncThunk(
	'ingredients/getAllIngredients',
	async (arg, thunkApi) => {
		try {
			return await getAllIngredientsApi();
		} catch (err) {
			return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
		}
	}
);
