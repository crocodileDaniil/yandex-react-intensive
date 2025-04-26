import { createSlice } from '@reduxjs/toolkit';
import { postPlaceOrder } from './action';

const initialState = {
	orderNumbers: [],
	requestCompleted: false,
	isOpen: false,
	loading: false,
	orderError: null,
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
	},
});

export const { closeModal } = orderSlice.actions;
export const {
	getOrderNumber,
	getOrder,
	getRequestCompleted,
	getIsOpen,
	getLoading,
	getOrderError,
	getIsError,
} = orderSlice.selectors;
