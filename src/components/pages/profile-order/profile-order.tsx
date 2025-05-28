import { connect, disconnect } from '@services/ordersStream/actions';
import { getOrders } from '@services/ordersStream/reducer';
import { useDispatch, useSelector } from '@services/store';
import { urlWsConnect } from '@utils/url';
import { useEffect } from 'react';

export const ProfileOrder = () => {
	const dispatch = useDispatch();
	const orders = useSelector(getOrders);

	console.log(orders);
	useEffect(() => {
		const token = localStorage.getItem('accessToken');

		if (token) {
			dispatch(connect(urlWsConnect(true))); // генерирует URL c токеном
		}

		return () => {
			dispatch(disconnect());
		};
	}, []);
	return <p className='text text_type_main-medium'> History cel </p>;
};
