import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useDispatch, useSelector } from '@utils/custom-hooks';
import { getBun, getFilling } from '@services/constructor/reducer';
import { useCallback, useMemo } from 'react';
import { closeModal, getLoading, getOrderError } from '@services/order/reducer';
import { postPlaceOrder } from '@services/order/action';
import { TIngredient } from '@utils/types/types';

import { useNavigate } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';
import { ORDER_ERROR_FOR_REDIRECT } from '@utils/errorsMessages';

export const PlaceOrder = () => {
	const bun: TIngredient | undefined | null = useSelector(getBun);
	const filling: TIngredient[] = useSelector(getFilling);
	const loading = useSelector(getLoading);
	const error = useSelector(getOrderError);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const totalPrice = useMemo(
		() =>
			filling.reduce((acc, elem) => elem.price + acc, 0) +
			(bun ? bun.price : 0 * 2),
		[bun, filling]
	);

	const makeOrder = useCallback(() => {
		const order = bun ? [`${bun['_id']}`] : [];
		const orderFill = filling.map((fil) => `${fil['_id']}`);
		order.push(...orderFill);
		bun && order.push(`${bun['_id']}`);
		dispatch(postPlaceOrder(order));
	}, [filling, bun]);

	if (error === ORDER_ERROR_FOR_REDIRECT) {
		dispatch(closeModal());
		navigate(pathPages.login);
	}

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
