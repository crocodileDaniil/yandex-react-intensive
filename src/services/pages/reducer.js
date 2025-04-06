import { createSlice } from '@reduxjs/toolkit';
import { restaurantPages } from '@utils/restaurantPages';

const initialState = {
	page: restaurantPages[0],
};

export const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload;
		},
	},
	selectors: {
		getPage: (state) => state.page,
	},
});

export const { setPage } = pageSlice.actions;
export const { getPage } = pageSlice.selectors;
