import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientInfoSlice } from './ingredient-info/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { orderSlice } from './order/reducer';
import { constructorSlice } from './constructor/reducer';
import { pageSlice } from './pages/reducer';

const rootReducer = combineSlices(
	pageSlice,
	ingredientInfoSlice,
	ingredientsSlice,
	orderSlice,
	constructorSlice
);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
});

console.log('redux_store: ', store.getState());

export const getStore = () => store.getState();

export default store;
