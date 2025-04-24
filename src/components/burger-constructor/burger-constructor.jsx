import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { IngredientConstructor } from './ingredient-constructor/ingredient-constructor';
import { PlaceOrder } from './place-order/place-order';

import { OrderDetails } from './modal-order-details/modal-order-details';
import { useSelector } from 'react-redux';
import { getBun, setBun } from '@services/constructor/reducer';
import { IngredientPlace } from './ingredient-place/ingredient-place';
import { getIsOpen, getRequestCompleted } from '@services/order/reducer';
import { useDrop } from 'react-dnd';
import { ItemDropTypes } from '@utils/items-drop-types';
import { useDispatch } from 'react-redux';
import { IngredientFilling } from './ingredient-filling/ingredient-filling';

export const BurgerConstructor = () => {
	const isOpenModal = useSelector(getIsOpen);
	const dispatch = useDispatch();
	const requestCompleted = useSelector(getRequestCompleted);
	// или для булок лучше создать 2 рефа?
	const [{ isOverBun, canDropBun }, dropRefBun] = useDrop(() => ({
		accept: ItemDropTypes.INGREDIENT_BURGER_BUN,
		drop: (item) => {
			dispatch(setBun({ bun: { ...item } }));
		},
		collect: (monitor) => ({
			isOverBun: monitor.isOver(),
			canDropBun: monitor.canDrop(),
		}),
	}));

	const bun = useSelector(getBun);
	const styleDropBun = canDropBun && 'drop-bun';
	const styleOverBun = isOverBun && 'over-bun';

	return (
		<section className={`${styles.constructor} pt-25`} ref={dropRefBun}>
			<div
				className={`but mb-4 mr-4 ${styles[styleDropBun]} ${styles[styleOverBun]} ${styles.bun}`}>
				{bun ? (
					<IngredientConstructor type='top' {...bun} isLocked={true} />
				) : (
					<IngredientPlace text='Выберет булку' type='top' />
				)}
			</div>
			<IngredientFilling />
			<div className='but mr-4 mb-10' ref={dropRefBun}>
				{bun ? (
					<IngredientConstructor type='bottom' {...bun} isLocked={true} />
				) : (
					<IngredientPlace text='Выберете булку' type='bot' />
				)}
			</div>
			<PlaceOrder />
			{isOpenModal && requestCompleted && <OrderDetails />}
		</section>
	);
};

BurgerConstructor.propTypes = {};
