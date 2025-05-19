import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientInfoSlice } from './ingredient-info/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { orderSlice } from './order/reducer';
import { constructorSlice } from './constructor/reducer';
import { userSlice } from './user/reducer';

const rootReducer = combineSlices(
	ingredientInfoSlice,
	ingredientsSlice,
	orderSlice,
	constructorSlice,
	userSlice
);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
});

console.log('redux_store: ', store.getState());

export const getStore = () => store.getState();

export default store;
