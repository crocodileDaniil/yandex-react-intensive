import { FILTER_DECRYPTION } from './filter-decryption';

export const getFilteredDataByCategory = (arr, filter) => {
	return arr.reduce((acc, element) => {
		const category = element[filter];
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(element);
		return acc;
	}, {});
};

export const getKeyToValue = (obj = FILTER_DECRYPTION, value) => {
	return Object.keys(obj).find((key) => obj[key] === value);
};
