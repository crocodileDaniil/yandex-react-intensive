import {
	URL_GET_AUTH_USER,
	URL_GET_INGREDIENTS,
	URL_PATCH_AUTH_USER,
	URL_POST_AUTH_LOGIN,
	URL_POST_AUTH_LOGOUT,
	URL_POST_AUTH_REGISTER,
	URL_POST_AUTH_TOKEN,
	URL_POST_PLACE_ORDER,
} from './url';

const getResponse = async (res) => {
	if (res.ok) return await res.json();

	throw new Error(
		`Error ${res.status}: 
    ${res.statusText}`
	);
};

export const getAllIngredientsApi = async () => {
	try {
		const response = await fetch(URL_GET_INGREDIENTS);
		return await getResponse(response);
	} catch (e) {
		throw e;
	}
};

export const postPlaceOrderApi = async (body) => {
	try {
		let accessToken = localStorage.getItem('accessToken');
		const response = await fetch(URL_POST_PLACE_ORDER, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ ingredients: body }),
		});

		// console.log({
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-type': 'application/json;charset=utf-8',
		// 	},
		// 	body: JSON.stringify({ ingredients: body }),
		// });
		console.log(await getResponse(response));
		return await getResponse(response);
	} catch (e) {
		throw e;
	}
};

export const fetchWithAuthRefreshTokenApi = async (
	url,
	options = {},
	retry = true
) => {
	let accessToken = localStorage.getItem('accessToken');
	options.headers = {
		...(options.headers || {}),
		Authorization: `Bearer ${accessToken}`,
		'Content-Type': 'application/json ;charset=utf-8',
	};

	let response = await fetch(url, options);

	// Если токен истёк
	if (response.status === 401 && retry) {
		const refreshToken = localStorage.getItem('refreshToken');

		const tokenResponse = await fetch(
			URL_POST_AUTH_TOKEN, // переобновление токена
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json ;charset=utf-8',
				},
				body: { token: JSON.stringify({ refreshToken }) },
			}
		);

		if (tokenResponse.ok) {
			const newTokens = await tokenResponse.json();
			localStorage.setItem('accessToken', newTokens.accessToken);
			localStorage.setItem('refreshToken', newTokens.refreshToken);

			// Повторяем оригинальный запрос с новым токеном
			return fetchWithAuthRefreshTokenApi(url, options, false);
		} else {
			localStorage.removeItem('accessToken', newTokens.accessToken);
			localStorage.removeItem('refreshToken', newTokens.refreshToken);
			return newTokens.statusText;
		}
	}

	return response;
};

export const registerUserApi = async (userData) => {
	try {
		const response = await fetch(URL_POST_AUTH_REGISTER, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();

		if (response.ok) {
			console.log(data);
			const accessToken = data.accessToken.split(' ')[1];
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);
			console.log('register Completed');
			return data.user;
		} else {
			console.error('Registration error:', data.message);
			return data.message;
		}
	} catch (error) {
		console.error('Request failed:', error);
	}
};

export const logoutUserApi = async () => {
	let refreshToken = localStorage.getItem('refreshToken');
	try {
		const res = await fetchWithAuthRefreshTokenApi(URL_POST_AUTH_LOGOUT, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json ;charset=utf-8',
			},
			body: {
				token: JSON.stringify(refreshToken),
			},
		});
		return await res.json();
	} catch (err) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		throw err;
	}
};

export const loginUserApi = async (body) => {
	try {
		const response = await fetch(URL_POST_AUTH_LOGIN, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (response.ok) {
			const accessToken = data.accessToken.split(' ')[1];
			console.log(data);
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);
			console.log('login Completed');
			return data.user;
		} else {
			console.error('Registration error:', data.message);
			return data.message;
		}
	} catch (error) {
		console.error('Request failed:', error);
	}
};

export const getUserApi = async () => {
	let accessToken = localStorage.getItem('accessToken');
	try {
		const res = await fetchWithAuthRefreshTokenApi(URL_GET_AUTH_USER, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json ;charset=utf-8',
			},
		});
		const response = await res.json();
		console.log(response);
		return response.user;
	} catch (error) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		throw error;
	}
};

export const patchRefreshDataUserApi = async (body) => {
	let accessToken = localStorage.getItem('accessToken');
	try {
		const res = await fetchWithAuthRefreshTokenApi(URL_PATCH_AUTH_USER, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json ;charset=utf-8',
			},
			body: JSON.stringify({ user: body }),
		});
		const response = await res.json();
		return response;
	} catch (error) {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		throw error;
	}
};
