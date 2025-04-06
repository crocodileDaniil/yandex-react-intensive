import { createSlice } from '@reduxjs/toolkit';
import { getAllIngredients } from './action';

const initialState = {
	ingredients: [],
	loading: false,
	error: null,
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
// где-то читал писали так нужно
// export const {
// 	getAllIngredients,
// 	getIngredientsLoading,
// 	getIngredientsError,
// 	getIngredientshasError,
// } = ingredientsSlice.getSelectors();
