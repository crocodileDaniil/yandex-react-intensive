import { createSlice } from '@reduxjs/toolkit';
import { getCurrentOrder, postPlaceOrder, TCurrentOrder } from './action';

type TOrderState = {
	orderNumbers: number[];
	currentOrders: Array<TCurrentOrder>;
	requestCompleted: boolean;
	isOpen: boolean;
	loading: boolean;
	orderError: string | undefined;
	isError: boolean;
};

export const initialState: TOrderState = {
	orderNumbers: [],
	currentOrders: [],
	requestCompleted: false,
	isOpen: false,
	loading: false,
	orderError: '',
	isError: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		closeModal: (state) => {
			state.isOpen = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postPlaceOrder.pending, (state) => {
				state.isError = false;
				state.orderError = '';
				state.loading = true;
			})
			.addCase(postPlaceOrder.fulfilled, (state, action) => {
				state.orderNumbers.push(action.payload.order.number);
				state.loading = false;
				state.isOpen = true;
				state.requestCompleted = true;
			})
			.addCase(postPlaceOrder.rejected, (state, action) => {
				state.orderError = action.payload;
				state.isError = true;
				state.loading = false;
				state.isOpen = true;
				state.requestCompleted = true;
			})
			.addCase(getCurrentOrder.pending, (state) => {
				state.orderError = '';
				state.loading = true;
			})
			.addCase(getCurrentOrder.fulfilled, (state, action) => {
				state.currentOrders = action.payload.orders;
				state.loading = false;
				state.requestCompleted = true;
			})
			.addCase(getCurrentOrder.rejected, (state, action) => {
				state.orderError = action.payload;
				state.isError = true;
				state.loading = false;
				state.isOpen = true;
				state.requestCompleted = true;
			});
	},
	selectors: {
		getOrderNumber: (state) =>
			state.orderNumbers[state.orderNumbers.length - 1],
		getRequestCompleted: (state) => state.requestCompleted,
		getIsOpen: (state) => state.isOpen,
		getLoading: (state) => state.loading,
		getOrderError: (state) => state.orderError,
		getIsError: (state) => state.isError,
		getCurrentOrders: (state) => state.currentOrders,
	},
});

export const { closeModal } = orderSlice.actions;
export const {
	getOrderNumber,
	getRequestCompleted,
	getIsOpen,
	getLoading,
	getOrderError,
	getIsError,
	getCurrentOrders,
} = orderSlice.selectors;

export default orderSlice.reducer;
