import { logoutUser } from '@services/user/action';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const Exit = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(logoutUser());
	}, []);
	return <p className='text text_type_main-medium'> Производится выход </p>;
};
