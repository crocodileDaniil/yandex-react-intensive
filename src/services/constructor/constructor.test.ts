import constructorReducer, {
	constructorSlice,
	setIngredient,
	setBun,
	removeBun,
	swapIngredient,
	deleteIngredient,
	clearConstructor,
	initialState,
} from './reducer';
import { jest } from '@jest/globals';
// import { nanoid } from 'nanoid';
const testKey = 'test123';
jest.mock('nanoid', () => ({ nanoid: () => testKey }));

const mockIngredient = {
	_id: '123',
	name: 'Test Ingredient',
	type: 'main',
	proteins: 10,
	fat: 5,
	carbohydrates: 20,
	calories: 150,
	price: 100,
	image: 'img.png',
	image_mobile: 'img_mobile.png',
	image_large: 'img_large.png',
	__v: 0,
};

const mockIngredientWithKey = {
	...mockIngredient,
	key: testKey,
};

describe('constructorSlice', () => {
	it('should handle setIngredient', () => {
		// пришлось сделат так, чтобы обойти nanoid, поскольку он не мокался. возможно, подскажете способ для решения этой проблемы
		expect(
			constructorSlice.reducer(undefined, {
				type: 'burgerConstructor/setIngredient',
				payload: { ingredient: mockIngredientWithKey },
			})
		).toEqual({
			...initialState,
			ingredients: [mockIngredientWithKey],
		});
	});

	it('should handle setBun', () => {
		const action = setBun({ bun: mockIngredient });
		const state = constructorReducer(initialState, action);
		expect(state.bun).toEqual(mockIngredient);
	});

	it('should handle removeBun', () => {
		const action = removeBun();
		const state = constructorReducer(
			{ ...initialState, bun: mockIngredient },
			action
		);
		expect(state.bun).toBeNull();
	});

	it('should handle swapIngredient', () => {
		const stateWithIngredients = {
			...initialState,
			ingredients: [
				{ ...mockIngredient, key: '1' },
				{ ...mockIngredient, key: '2' },
				{ ...mockIngredient, key: '3' },
			],
		};
		const action = swapIngredient({ fromIndex: 0, toIndex: 2 });
		const state = constructorReducer(stateWithIngredients, action);
		expect(state.ingredients.map((i) => i.key)).toEqual(['2', '3', '1']);
	});

	it('should handle deleteIngredient by uniqueId', () => {
		const stateWithIngredients = {
			...initialState,
			ingredients: [
				{ ...mockIngredient, key: 'del-1' },
				{ ...mockIngredient, key: 'del-2' },
			],
		};
		const action = deleteIngredient({ uniqueId: 'del-1' });
		const state = constructorReducer(stateWithIngredients, action);
		expect(state.ingredients).toHaveLength(1);
		expect(state.ingredients[0].key).toBe('del-2');
	});

	it('should handle clearConstructor', () => {
		const filledState = {
			bun: mockIngredient,
			ingredients: [{ ...mockIngredient, key: 'some-key' }],
		};
		const action = clearConstructor();
		const state = constructorReducer(filledState, action);
		expect(state.bun).toBeNull();
		expect(state.ingredients).toEqual([]);
	});
});
