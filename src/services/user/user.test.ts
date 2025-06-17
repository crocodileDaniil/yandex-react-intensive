import reducer, { initialState, setUser, clearError } from './reducer';
import {
	registerUser,
	loginUser,
	logoutUser,
	checkUserAuth,
	editProfileUser,
} from './action';

const mockUser = {
	email: 'test@example.com',
	name: 'Test User',
};

describe('userSlice', () => {
	it('should return initial State', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle setUser', () => {
		const nextState = reducer(initialState, setUser(mockUser));
		expect(nextState.user).toEqual(mockUser);
	});

	it('clearError должен очищать ошибку', () => {
		const errorState = { ...initialState, error: 'Ошибка' };
		const nextState = reducer(errorState, clearError());
		expect(nextState.error).toBeNull();
	});

	it('should handle registerUser.pending', () => {
		const nextState = reducer(initialState, {
			type: registerUser.pending.type,
		});
		expect(nextState.loading).toBe(true);
	});

	it('should handle registerUser.fulfilled', () => {
		const payload = { user: mockUser, success: true };
		const nextState = reducer(initialState, {
			type: registerUser.fulfilled.type,
			payload,
		});
		expect(nextState.user).toEqual(mockUser);
		expect(nextState.isAuthChecked).toBe(true);
		expect(nextState.loading).toBe(false);
		expect(nextState.hasError).toBe(false);
	});

	it('should handle registerUser.rejected', () => {
		const nextState = reducer(initialState, {
			type: registerUser.rejected.type,
			payload: 'Ошибка регистрации',
		});
		expect(nextState.error).toBe('Ошибка регистрации');
		expect(nextState.hasError).toBe(true);
		expect(nextState.loading).toBe(false);
	});

	it('should handle loginUser.fulfilled', () => {
		const payload = { user: mockUser, success: true };
		const nextState = reducer(initialState, {
			type: loginUser.fulfilled.type,
			payload,
		});
		expect(nextState.user).toEqual(mockUser);
		expect(nextState.isAuthChecked).toBe(true);
	});

	it('should handle loginUser.rejected', () => {
		const nextState = reducer(initialState, {
			type: loginUser.rejected.type,
			payload: 'Ошибка входа',
		});
		expect(nextState.user).toBeNull();
		expect(nextState.error).toBe('Ошибка входа');
		expect(nextState.hasError).toBe(true);
	});

	it('should handle logoutUser.fulfilled', () => {
		const loggedInState = {
			...initialState,
			user: mockUser,
			isAuthChecked: true,
		};
		const nextState = reducer(loggedInState, {
			type: logoutUser.fulfilled.type,
		});
		expect(nextState.user).toBeNull();
		expect(nextState.isAuthChecked).toBe(true);
	});

	it('should handle checkUserAuth.fulfilled', () => {
		const payload = { user: mockUser };
		const nextState = reducer(initialState, {
			type: checkUserAuth.fulfilled.type,
			payload,
		});
		expect(nextState.user).toEqual(mockUser);
		expect(nextState.isAuthChecked).toBe(true);
	});

	it('should handle editProfileUser.fulfilled', () => {
		const payload = { user: { ...mockUser, name: 'Updated User' } };
		const nextState = reducer(initialState, {
			type: editProfileUser.fulfilled.type,
			payload,
		});
		expect(nextState.user?.name).toBe('Updated User');
		expect(nextState.isAuthChecked).toBe(true);
	});
});
