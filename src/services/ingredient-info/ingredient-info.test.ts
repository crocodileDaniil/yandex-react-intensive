import ingredientInfoReducer, {
	setIngredientDetails,
	removeIngredientDetails,
	closeIngredientDetails,
	initialState
} from './reducer';

const mockIngredient = {
	_id: '1',
	name: 'Test Ingredient',
	type: 'main',
	proteins: 10,
	fat: 5,
	carbohydrates: 15,
	calories: 200,
	price: 100,
	image: 'img.png',
	image_mobile: 'img_mobile.png',
	image_large: 'img_large.png',
	__v: 0,
};

describe('ingredientInfoSlice', () => {

	it('should return the initial state', () => {
		expect(ingredientInfoReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle setIngredientDetails (open modal)', () => {
		const action = setIngredientDetails(mockIngredient);
		const state = ingredientInfoReducer(initialState, action);

		expect(state.ingredient).toEqual(mockIngredient);
		expect(state.isOpenModal).toBe(true);
	});

	it('should handle removeIngredientDetails (clear and toggle modal)', () => {
		const filledState = {
			ingredient: mockIngredient,
			isOpenModal: true,
		};

		const action = removeIngredientDetails();
		const state = ingredientInfoReducer(filledState, action);

		expect(state.ingredient).toBeNull();
		expect(state.isOpenModal).toBe(false);
	});

	it('should handle closeIngredientDetails (just close modal)', () => {
		const openState = {
			ingredient: mockIngredient,
			isOpenModal: true,
		};

		const action = closeIngredientDetails();
		const state = ingredientInfoReducer(openState, action);

		expect(state.isOpenModal).toBe(false);
		expect(state.ingredient).toEqual(mockIngredient); // ingredient не трогается
	});
});
