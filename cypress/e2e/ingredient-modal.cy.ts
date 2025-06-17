import {
	CLOSE_BUTTON,
	INGREDIENT_DETAILS,
	NAME_INGREDIENT,
} from './../../src/constants/test-data-selectors';
import mockIngredients from '../fixtures/mock-data.json';

const selectorModal = `[data-modal=${INGREDIENT_DETAILS}]`;
const selectorTestIngredient = `[data-ingredient="${mockIngredients.data.data[0]._id}"]`;
const selectorNameIngredient = `[data-ingredient=${NAME_INGREDIENT}]`;
const selectorCloseButton = `[data-modal=${CLOSE_BUTTON}]`;
const selectorOverlay = '[data-overlay="overlay"]';

describe('Проверка открытия модалки ингредиента', () => {
	beforeEach(() => {
		window.localStorage.setItem(
			'refreshToken',
			JSON.stringify('test-refreshToken')
		);
		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('test-accessToken')
		);
		// Перехватываем загрузку ингредиентов и подменяем ответ моком
		cy.fixture('mock-data.json').then((mockData) => {
			cy.intercept('GET', 'api/ingredients', {
				status: 200,
				body: mockData.data,
			}).as('getIngredients');

			// Переходим на главную страницу
			cy.visit('/');
		});
	});

	it('открывается модалка с корректными данными', () => {
		const firstIngredient = mockIngredients.data.data[0];

		cy.get(selectorTestIngredient).click();

		cy.get(selectorModal).should('exist');
		cy.get(selectorNameIngredient).should('contain.text', firstIngredient.name);
	});

	it('модалка закрывается по кнопке закрытия', () => {
		cy.get(selectorTestIngredient).click();
		cy.get(selectorModal).should('exist');

		cy.get(selectorCloseButton).click();

		cy.get(selectorModal).should('not.exist');
	});

	it('модалка закрывается по Escape', () => {
		cy.get(selectorTestIngredient).click();
		cy.get(selectorModal).should('exist');

		cy.get('body').type('{esc}');

		cy.get(selectorModal).should('not.exist');
	});

	it('модалка закрывается по клику на оверлей', () => {
		cy.get(selectorTestIngredient).click();
		cy.get(selectorModal).should('exist');

		cy.get(selectorOverlay).click('topLeft');

		cy.get(selectorModal).should('not.exist');
	});
});
