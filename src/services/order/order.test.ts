import orderReducer, {closeModal, initialState} from './reducer';
import { postPlaceOrder, getCurrentOrder } from './action';
import { TCurrentOrder } from './action';

const expectNumber = 12345;

const mockOrder = {
	order: {
		createdAt: '2025-06-12T00:00:00.000Z',
		ingredients: [],
		name: 'Тестовый заказ',
		number: expectNumber,
		owner: {
			name: 'Иван',
			updatedAt: '',
			createdAt: '',
			email: 'ivan@test.com',
		},
		price: 500,
		status: 'done',
		updatedAt: '',
		_id: 'orderid123',
	},
};

const mockCurrentOrders: TCurrentOrder[] = [
	{
		_id: 'abc123',
		createdAt: '2025-06-12T10:00:00.000Z',
		updatedAt: '2025-06-12T11:00:00.000Z',
		name: 'Текущий заказ',
		number: 999,
		owner: {
			name: 'Иван',
			email: 'ivan@test.com',
			createdAt: '',
			updatedAt: '',
		},
		price: 999,
		status: 'done',
		ingredients: ['123', '456'],
	},
];



describe('orderSlice', () => {
	it('should return the initial state', () => {
		expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle closeModal', () => {
		const state = orderReducer({ ...initialState, isOpen: true }, closeModal());
		expect(state.isOpen).toBe(false);
	});

	it('should handle postPlaceOrder.pending', () => {
		const state = orderReducer(initialState, {
			type: postPlaceOrder.pending.type,
		});
		expect(state).toEqual({
			...initialState,
			isError: false,
			orderError: '',
			loading: true,
		});
	});

	it('should handle postPlaceOrder.fulfilled', () => {
		const state = orderReducer(initialState, {
			type: postPlaceOrder.fulfilled.type,
			payload: mockOrder,
		});
		expect(state.orderNumbers).toContain(expectNumber);
		expect(state.loading).toBe(false);
		expect(state.isOpen).toBe(true);
		expect(state.requestCompleted).toBe(true);
	});

	it('should handle postPlaceOrder.rejected', () => {
		const state = orderReducer(initialState, {
			type: postPlaceOrder.rejected.type,
			payload: 'Ошибка создания заказа',
		});
		expect(state.orderError).toBe('Ошибка создания заказа');
		expect(state.isError).toBe(true);
		expect(state.loading).toBe(false);
		expect(state.isOpen).toBe(true);
		expect(state.requestCompleted).toBe(true);
	});

	it('should handle getCurrentOrder.pending', () => {
		const state = orderReducer(initialState, {
			type: getCurrentOrder.pending.type,
		});
		expect(state.loading).toBe(true);
		expect(state.orderError).toBe('');
	});

	it('should handle getCurrentOrder.fulfilled', () => {
		const state = orderReducer(initialState, {
			type: getCurrentOrder.fulfilled.type,
			payload: { success: true, orders: mockCurrentOrders },
		});
		expect(state.currentOrders).toEqual(mockCurrentOrders);
		expect(state.loading).toBe(false);
		expect(state.requestCompleted).toBe(true);
	});

	it('should handle getCurrentOrder.rejected', () => {
		const state = orderReducer(initialState, {
			type: getCurrentOrder.rejected.type,
			payload: 'Ошибка получения заказа',
		});
		expect(state.orderError).toBe('Ошибка получения заказа');
		expect(state.isError).toBe(true);
		expect(state.loading).toBe(false);
		expect(state.isOpen).toBe(true);
		expect(state.requestCompleted).toBe(true);
	});
});
