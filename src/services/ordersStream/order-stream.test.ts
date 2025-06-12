import orderStreamReducer, { initialState } from './reducer';

import {
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
} from './actions';

import { WebsocketStatus, TOrder } from '@utils/types/types-orders-stream/types';

const mockOrders: TOrder[] = [
	{
		_id: 'order1',
		number: 1,
		status: 'done',
		name: 'Бургер 1',
		createdAt: '2025-06-12T12:00:00.000Z',
		updatedAt: '2025-06-12T12:10:00.000Z',
		ingredients: ['id1', 'id2'],
	},
	{
		_id: 'order2',
		number: 2,
		status: 'pending',
		name: 'Бургер 2',
		createdAt: '2025-06-12T13:00:00.000Z',
		updatedAt: '2025-06-12T13:05:00.000Z',
		ingredients: ['id3'],
	},
];

describe('orderStreamSlice reducer', () => {
	it('should return initial state', () => {
		expect(orderStreamReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle onConnecting', () => {
		const state = orderStreamReducer(initialState, onConnecting());
		expect(state.status).toBe(WebsocketStatus.CONNECTING);
	});

	it('should handle onOpen', () => {
		const state = orderStreamReducer(initialState, onOpen());
		expect(state.status).toBe(WebsocketStatus.ONLINE);
	});

	it('should handle onClose', () => {
		const onlineState = { ...initialState, status: WebsocketStatus.ONLINE };
		const state = orderStreamReducer(onlineState, onClose());
		expect(state.status).toBe(WebsocketStatus.OFFLINE);
	});

	it('should handle onError', () => {
		const state = orderStreamReducer(initialState, onError('Ошибка соединения'));
		expect(state.error).toBe('Ошибка соединения');
	});

	it('should handle onMessage', () => {
		const payload = {
			success: 'true',
			orders: mockOrders,
			total: 100,
			totalToday: 10,
		};
		const state = orderStreamReducer(initialState, onMessage(payload));
		expect(state.orders).toEqual(mockOrders);
		expect(state.total).toBe(100);
		expect(state.totalToDay).toBe(10);
	});

	it('should handle onMessage with missing total/totalToday', () => {
		const payload = {
			success: 'true',
			orders: mockOrders,
			total: undefined,
			totalToday: undefined,
		};
		const state = orderStreamReducer(initialState, onMessage(payload));
		expect(state.total).toBeNull();
		expect(state.totalToDay).toBeNull();
	});
});

