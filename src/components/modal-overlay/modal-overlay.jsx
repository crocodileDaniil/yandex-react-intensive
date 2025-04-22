import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = (props) => {
	const location = useLocation();

	const blackout =
		location.state || location.pathname.length === 1 ? styles.blackout : ''; // со стейт модалка для ингр, === 1 для оформления заказа
	return (
		<div className={`${styles.overlay} ${blackout}`} onClick={props.onClose}>
			{props.children}
		</div>
	);
};

ModalOverlay.propTypes = {
	onCose: PropTypes.func,
	children: PropTypes.element,
};
