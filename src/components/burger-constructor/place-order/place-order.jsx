import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const PlaceOrder = (props) => {
	return (
		<article className={`${styles['place-order']} mr-4`}>
			<div className={styles.price}>
				<p className='text text_type_digits-medium'>133113</p>
				<CurrencyIcon type='primary' />
			</div>
			<Button
				htmlType='button'
				type='primary'
				size='large'
				onClick={props.openModal}>
				Оформить заказ
			</Button>
		</article>
	);
};

PlaceOrder.propTypes = {
	openModal: PropTypes.func,
};
