import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllIngredientsApi } from '@utils/api';
import { TIngredient } from '@utils/types/types';

type TIngredientsResponse = {
	success: boolean;
	data: TIngredient[];
};

export const getAllIngredients = createAsyncThunk<
	TIngredientsResponse,
	void,
	{ rejectValue: string }
>('ingredients/getAllIngredients', async (_, thunkApi) => {
	try {
		const data = await getAllIngredientsApi();
		// console.log(data);
		return data as TIngredientsResponse;
	} catch (err: any) {
		return thunkApi.rejectWithValue(err.message ?? 'Неизвестная ошибка');
	}
});
