import ingredientsReducer, { initialState } from './reducer';
import { getAllIngredients } from './action';
import { TIngredient } from '@utils/types/types';
import { getIngredientsMap } from '@utils/helper-function';
import { MOCK_DATA } from '../../constants/mock';

// const mockIngredients: TIngredient[] = MOCK_DATA

describe('ingredientsSlice', () => {
	it('should return the initial state', () => {
		expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle getAllIngredients.pending', () => {
		const state = ingredientsReducer(initialState, {
			type: getAllIngredients.pending.type,
		});

		expect(state).toEqual({
			...initialState,
			loading: true,
		});
	});

	it('should handle getAllIngredients.fulfilled', () => {
		const state = ingredientsReducer(initialState, {
			type: getAllIngredients.fulfilled.type,
			payload: { success: true, data: MOCK_DATA },
		});

		expect(state).toEqual({
			...initialState,
			loading: false,
			hasError: false,
			ingredients: MOCK_DATA,
			ingredientsMap: getIngredientsMap(MOCK_DATA),
		});
	});

	it('should handle getAllIngredients.rejected', () => {
		const errorMsg = 'Ошибка загрузки';
		const state = ingredientsReducer(initialState, {
			type: getAllIngredients.rejected.type,
			payload: errorMsg,
		});

		expect(state).toEqual({
			...initialState,
			loading: false,
			hasError: true,
			error: errorMsg,
		});
	});
});
