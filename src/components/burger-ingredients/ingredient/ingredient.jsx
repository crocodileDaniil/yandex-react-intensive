import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setIngredientDetails } from '@services/ingredient-info/reducer';
import { useSelector } from 'react-redux';
import { getFilling } from '@services/constructor/reducer';
import { useDrag } from 'react-dnd';
import { ItemDropTypes } from '@utils/items-drop-types';

export const Ingredient = (props) => {
	const { type, image, price, name, _id, count } = props;

	const dispatch = useDispatch();
	const [{ isDrag }, dragRef] = useDrag(() => ({
		type:
			type === 'bun'
				? ItemDropTypes.INGREDIENT_BURGER_BUN
				: ItemDropTypes.INGREDIENT_BURGER_FILLING,
		item: props,
		end: (item, monitor) => {
			//для себя, чтобы потом какой эффект попробовать сделать
			const result = monitor.getDropResult();
			// console.log(result);
			// console.log(item);
		},
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	}));
	const styleBorder = isDrag && 'drag';

	return (
		<article
			className={`${styles.ingredient} pd-4 pr-4 pb-4 ${styles[styleBorder]}`}
			ref={dragRef}
			onClick={() =>
				dispatch(
					setIngredientDetails({
						...props,
					})
				)
			}>
			<div className={styles.count}>{!!count && <Counter count={count} />}</div>
			<img src={image} alt={`${name}`} />
			<div className={styles.price}>
				<p className='text text_type_digits-default'>{price}</p>{' '}
				<CurrencyIcon type='primary' />
			</div>
			<p className={`${styles.text} text text_type_main-default`}>{name}</p>
		</article>
	);
};

Ingredient.propTypes = {
	_id: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	price: PropTypes.number,
	image: PropTypes.string,
	image_mobile: PropTypes.string,
	image_large: PropTypes.string,
	__v: PropTypes.number,
	count: PropTypes.number,
};
