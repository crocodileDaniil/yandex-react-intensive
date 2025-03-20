import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

export const Modal = (props) => {
	const { onClose, children, classModal, classButton } = props;
	return (
		<ModalOverlay onCose={onClose}>
			<section
				className={`${styles.modal} ${classModal}`}
				onClick={(e) => e.stopPropagation()}>
				<button className={`${styles.close} ${classButton}`} onClick={onClose}>
					<CloseIcon type='primary' />
				</button>
				{children}
			</section>
		</ModalOverlay>
	);
};

Modal.protoType = {
	onClose: PropTypes.func,
	children: PropTypes.element,
	classModal: PropTypes.string,
	classButton: PropTypes.string,
};
