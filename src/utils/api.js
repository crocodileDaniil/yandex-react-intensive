import { URL_GET_INGREDIENTS, URL_POST_PLACE_ORDER } from './url';

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
			body: JSON.stringify(body),
		});
		console.log(await getResponse(response));
		return await getResponse(response);
	} catch (e) {
		throw e;
	}
};
