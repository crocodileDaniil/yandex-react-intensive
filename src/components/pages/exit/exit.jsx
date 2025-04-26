import { logoutUser } from '@services/user/action';
import { getUser } from '@services/user/reducer';
import { pathPages } from '@utils/page-paths';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

export const Exit = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const logout = async () => {
			dispatch(logoutUser());
			navigate(pathPages.login, { replace: true });
		};
		logout();
	}, []);

	return <p className='text text_type_main-medium'> Производится выход </p>;
};
