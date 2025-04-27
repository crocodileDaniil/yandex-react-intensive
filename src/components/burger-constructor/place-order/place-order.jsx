import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { getBun, getFilling } from '@services/constructor/reducer';
import { useCallback, useMemo } from 'react';
import { getLoading } from '@services/order/reducer';
import { useDispatch } from 'react-redux';
import { postPlaceOrder } from '@services/order/action';

export const PlaceOrder = (props) => {
	const bun = useSelector(getBun) || {};
	const filling = useSelector(getFilling);
	const loading = useSelector(getLoading);
	const dispatch = useDispatch();

	const totalPrice = useMemo(
		() =>
			filling.reduce((acc, elem) => elem.price + acc, 0) +
			(bun?.price * 2 || 0),
		[bun, filling]
	);

	const makeOrder = useCallback(() => {
		const order = bun['_id'] ? [`${bun['_id']}`] : [];
		const orderFill = filling.map((fil) => `${fil['_id']}`);
		order.push(...orderFill);
		bun['_id'] && order.push(`${bun['_id']}`);
		dispatch(postPlaceOrder(order));
	}, [filling, bun]);

	return (
		<article className={`${styles['place-order']} mr-4`}>
			<div className={styles.price}>
				<p className='text text_type_digits-medium'>{totalPrice || 0}</p>
				<CurrencyIcon type='primary' />
			</div>
			<Button
				htmlType='button'
				type='primary'
				size='large'
				onClick={() => makeOrder()}>
				Оформить заказ
			</Button>
			{loading && (
				<p className={`${styles.loading} text text_type_main-default`}>
					{' '}
					Идёт формирование заказа...{' '}
				</p>
			)}
		</article>
	);
};

PlaceOrder.propTypes = {};
