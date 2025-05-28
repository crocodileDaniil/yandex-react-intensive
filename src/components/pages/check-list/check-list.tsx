import { useEffect } from 'react';
import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import { useDispatch, useSelector } from '@services/store';
import { connect, disconnect } from '@services/ordersStream/actions';
import { urlWsConnect } from '@utils/url';
import { getOrders } from '@services/ordersStream/reducer';

export const CheckList = () => {
	const dispatch = useDispatch();
	const orders = useSelector(getOrders);

	console.log(orders);
	useEffect(() => {
		dispatch(connect(urlWsConnect()));

		return () => {
			dispatch(disconnect());
		};
	}, []);

	return (
		<Layout>
			<Container>
				<main> пока пусто </main>
			</Container>
		</Layout>
	);
};

CheckList.propTypes = {};
