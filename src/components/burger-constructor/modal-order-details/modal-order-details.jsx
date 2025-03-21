import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types'
import styles from './styles.module.css';
import { Modal } from '../../modal/modal';

export const OrderDetails = ({ numberOrder = 88005553535, onClose }) => {
	const modalStylesClass = `${styles.modal} pt-30 pr-25 pl-25 pb-30`;
	const buttonStylesClass = styles.close ? `${styles.close}` : ' ';

	return (
		<Modal
			onClose={onClose}
			classModal={modalStylesClass}
			classButton={buttonStylesClass}>
			<>
				<p className='text text_type_digits-large mb-8'>{numberOrder}</p>
				<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
				<div className={`${styles.logo} mb-15`}>
					<div className={`${styles.check} `}>
						<CheckMarkIcon type='primary' />
					</div>
				</div>
				<p className='text text_type_main-small mb-2'>
					Ваш заказ начали готовить
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					Дождитесь готовности на орбитальной станции
				</p>
			</>
		</Modal>
	);
};

OrderDetails.propTypes = {
	numberOrder: PropTypes.number,
	onClose: PropTypes.func,
};
