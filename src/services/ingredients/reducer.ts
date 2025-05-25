import { createSlice } from '@reduxjs/toolkit';
import { getAllIngredients } from './action';
import { TIngredient } from '@utils/types/types';

type TStateIngredients = {
	ingredients: TIngredient[];
	loading: boolean;
	error: string | undefined;
	hasError: boolean;
};

const initialState: TStateIngredients = {
	ingredients: [],
	loading: false,
	error: '',
	hasError: false,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	selectors: {
		getIngredients: (state) => state.ingredients,
		getIngredientsLoading: (state) => state.loading,
		getIngredientsError: (state) => state.error,
		getIngredientsHasError: (state) => state.hasError,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllIngredients.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllIngredients.fulfilled, (state, action) => {
				state.loading = false;
				state.hasError = false;
				state.ingredients = action.payload.data;
			})
			.addCase(getAllIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.hasError = true;
			});
	},
});

export const {
	getIngredients,
	getIngredientsLoading,
	getIngredientsError,
	getIngredientsHasError,
} = ingredientsSlice.selectors;
