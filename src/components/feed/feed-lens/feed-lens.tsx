import { getOrders } from '@services/ordersStream/reducer';
import { useSelector } from '@utils/custom-hooks';
import { OrderCard } from '../../burger-orders/order-card/order-card';
import { nanoid } from '@reduxjs/toolkit';

import styles from './styles.module.css';

export const FeedLens = () => {
	const orders = useSelector(getOrders);

	return (
		<div className={styles.lens}>
			{orders.map((order) => (
				<OrderCard key={nanoid()} {...order} />
			))}
		</div>
	);
};
