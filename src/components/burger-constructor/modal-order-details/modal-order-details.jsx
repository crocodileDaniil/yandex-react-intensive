import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { Modal } from '../../modal/modal';

const containerModal = document.getElementById('modal-root');

export const OrderDetails = ({ numberOrder = 88005553535, onClose }) => {
	useEffect(() => {
		const closeOnEscape = (e) => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', closeOnEscape);
		return () => document.removeEventListener('keydown', closeOnEscape);
	}, [onClose]);

	const modalStylesClass = `${styles.modal} pt-30 pr-25 pl-25 pb-30`;
	const buttonStylesClass = styles.close ? `${styles.close}` : ' ';
	return ReactDOM.createPortal(
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
		</Modal>,
		containerModal
	);
};

OrderDetails.propTypes = {
	numberOrder: PropTypes.number,
	onClose: PropTypes.func,
};
