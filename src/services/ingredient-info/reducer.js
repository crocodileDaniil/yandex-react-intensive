import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ingredient: {},
	isOpenModal: false,
};

export const ingredientInfoSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		setIngredientDetails: (state, action) => {
			state.ingredient = action.payload;
			state.isOpenModal = !state.isOpenModal;
		},
		removeIngredientDetails: (state) => {
			state.ingredient = {};
			state.isOpenModal = !state.isOpenModal;
		},
		closeIngredientDetails: (state) => {
			state.isOpenModal = false;
		},
	},
	selectors: {
		getDataIngredientDetails: (state) => state.ingredient,
		getActiveIngredientDetails: (state) => state.isOpenModal,
	},
});

export const {
	setIngredientDetails,
	removeIngredientDetails,
	closeIngredientDetails,
} = ingredientInfoSlice.actions;
export const { getDataIngredientDetails, getActiveIngredientDetails } =
	ingredientInfoSlice.selectors;
