import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = (props) => {
	return (
		<div className={styles.overlay} onClick={props.onCose}>
			{props.children}
		</div>
	);
};

ModalOverlay.propTypes = {
	onCose: PropTypes.func,
	children: PropTypes.element,
};
