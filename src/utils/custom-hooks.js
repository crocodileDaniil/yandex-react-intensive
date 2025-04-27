import { useState } from 'react';

export const useForm = (initialState) => {
	const [form, setFormValue] = useState(initialState);

	const onChange = (e) => {
		setFormValue({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	return [form, onChange, setFormValue];
};
