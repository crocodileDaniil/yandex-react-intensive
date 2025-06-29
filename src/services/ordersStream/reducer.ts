import { createSlice } from '@reduxjs/toolkit';
import {
	TOrder,
	WebsocketStatus,
} from '@utils/types/types-orders-stream/types';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';

type TStateOrdersStream = {
	orders: TOrder[];
	status: WebsocketStatus;
	error: string | null;
	total?: number | null;
	totalToDay?: number | null;
};

export const initialState: TStateOrdersStream = {
	orders: [],
	status: WebsocketStatus.OFFLINE,
	error: null,
	total: null,
	totalToDay: null,
};

export const orderStreamSlice = createSlice({
	name: 'orderStream',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(onConnecting, (state) => {
				state.status = WebsocketStatus.CONNECTING;
			})
			.addCase(onOpen, (state) => {
				state.status = WebsocketStatus.ONLINE;
			})
			.addCase(onClose, (state) => {
				state.status = WebsocketStatus.OFFLINE;
			})
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
				state.orders = action.payload.orders;
				state.total = action.payload.total ? action.payload.total : null;
				state.totalToDay = action.payload.totalToday
					? action.payload.totalToday
					: null;
			});
	},
	selectors: {
		getOrders: (state) => state.orders,
		getStatus: (state) => state.status,
		getError: (state) => state.error,
		getTotalToDay: (state) => state.totalToDay,
		getTotal: (state) => state.total,
	},
});

export const { getOrders, getStatus, getError, getTotal, getTotalToDay } =
	orderStreamSlice.selectors;

export default orderStreamSlice.reducer;
