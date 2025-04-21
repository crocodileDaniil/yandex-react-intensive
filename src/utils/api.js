import { URL_GET_INGREDIENTS, URL_POST_AUTH_TOKEN, URL_POST_PLACE_ORDER } from './url';

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
		const response = await fetch(URL_POST_PLACE_ORDER, {
			method: 'POST',
			headers: {
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

export const registerUser = async (userData) => {
	try {
		const response = await fetch('https://your-api.com/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();

		if (response.ok) {
			localStorage.setItem('accessToken', data.accessToken);
			localStorage.setItem('refreshToken', data.refreshToken);
			console.log('register Completed');
		} else {
			console.error('Registration error:', data.message);
		}
	} catch (error) {
		console.error('Request failed:', error);
	}
};

export const fetchWithAuth = async (url, options = {}, retry = true) => {
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
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ refreshToken }),
			}
		);

		if (tokenResponse.ok) {
			const newTokens = await tokenResponse.json();
			localStorage.setItem('accessToken', newTokens.accessToken);
			localStorage.setItem('refreshToken', newTokens.refreshToken);

			// Повторяем оригинальный запрос с новым токеном
			return fetchWithAuth(url, options, false);
		} else {
			console.error('Refresh token failed');
		}
	}

	return response;
};
