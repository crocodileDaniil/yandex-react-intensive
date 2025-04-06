import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
	bun: null,
	ingredients: [],
};

export const constructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		setIngredient: {
			reducer: (state, action) => {
				state.ingredients.push(action.payload.ingredient);
			},
			prepare: ({ ingredient }) => {
				const key = nanoid();
				return { payload: { ingredient: { ...ingredient, key } } };
			},
		},
		removeIngredient: (state, action) => {
			state.ingredients = state.ingredients.filter(
				(ingredient) => ingredient != action.payload.key
			);
		},
		setBun: (state, action) => {
			state.bun = action.payload.bun;
		},
		removeBun: (state) => {
			state.bun = {};
		},
		swapIngredient: (state, action) => {
			const updatedIngredients = [...state.ingredients];
			const { toIndex, fromIndex } = action.payload;
			updatedIngredients.splice(
				toIndex,
				0,
				updatedIngredients.splice(fromIndex, 1)[0]
			);
			state.ingredients = updatedIngredients;
		},
	},
	selectors: {
		getAllIngredients: (state) => state.ingredients,
		getBun: (state) => state.bun,
		getFilling: (state) => state.ingredients,
	},
});

export const {
	setIngredient,
	removeIngredient,
	setBun,
	removeBun,
	swapIngredient,
} = constructorSlice.actions;
export const { getAllIngredients, getBun, getFilling } =
	constructorSlice.selectors;
