import mockIngredients from '../fixtures/mock-data.json';

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

		cy.get(`[data-ingredient="${firstIngredient._id}"]`).click();

		cy.get('[data-modal="ingredient-details"]').should('exist');
		cy.get('[data-ingredient="name"]').should('contain.text', firstIngredient.name);
	});

	it('модалка закрывается по кнопке закрытия', () => {
		const firstIngredient = mockIngredients.data.data[0];

		cy.get(`[data-ingredient="${firstIngredient._id}"]`).click();
		cy.get('[data-modal="ingredient-details"]').should('exist');

		cy.get('[data-modal="close-button-modal"]').click();

		cy.get('[data-modal="ingredient-details"]').should('not.exist');
	});

	it('модалка закрывается по Escape', () => {
		const firstIngredient = mockIngredients.data.data[0];

		cy.get(`[data-ingredient="${firstIngredient._id}"]`).click();
		cy.get('[data-modal="ingredient-details"]').should('exist');

		cy.get('body').type('{esc}');

		cy.get('[data-modal="ingredient-details"]').should('not.exist');
	});

	it('модалка закрывается по клику на оверлей', () => {
		const firstIngredient = mockIngredients.data.data[0];

		cy.get(`[data-ingredient="${firstIngredient._id}"]`).click();
		cy.get('[data-modal="ingredient-details"]').should('exist');

		cy.get('[data-overlay="overlay"]').click('topLeft');

		cy.get('[data-modal="ingredient-details"]').should('not.exist');
	});
});
