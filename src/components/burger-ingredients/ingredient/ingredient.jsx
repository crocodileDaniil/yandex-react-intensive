import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const Ingredient = (props) => {
	const { image, price, name, onOpenModal } = props;
	return (
		<article
			className={`${styles.ingredient} pd-4 pr-4 pb-4`}
			onClick={() => onOpenModal(props['_id'])}>
			<div className={styles.count}>
				<Counter count={1} />
			</div>
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
	onOpenModal: PropTypes.func,
};
