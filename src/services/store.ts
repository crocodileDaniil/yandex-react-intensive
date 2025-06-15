import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientInfoSlice } from './ingredient-info/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { orderSlice } from './order/reducer';
import { constructorSlice } from './constructor/reducer';
import { userSlice } from './user/reducer';

import { socketMiddleware } from './middleware/websocket-middleware';
import {
	connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
} from './ordersStream/actions';
import { orderStreamSlice } from './ordersStream/reducer';

export const rootReducer = combineSlices(
	ingredientInfoSlice,
	ingredientsSlice,
	orderSlice,
	constructorSlice,
	userSlice,
	orderStreamSlice
);

const ordersStreamMiddleware = socketMiddleware({
	connect: connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddlewares) =>
		getDefaultMiddlewares().concat(ordersStreamMiddleware),
});

// console.log('redux_store: ', store.getState());

export const getStore = () => store.getState();

export default store;
