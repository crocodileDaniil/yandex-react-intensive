import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const containerModal = document.getElementById('modal-root');

export const Modal = (props) => {
	const { onClose, children, classModal, classButton } = props;

	useEffect(() => {
		const closeOnEscape = (e) => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', closeOnEscape);
		return () => {
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		<ModalOverlay onClose={onClose}>
			<section
				className={`${styles.modal} ${classModal} `}
				onClick={(e) => e.stopPropagation()}>
				<button className={`${styles.close} ${classButton}`} onClick={onClose}>
					<CloseIcon type='primary' />
				</button>
				{children}
			</section>
		</ModalOverlay>,
		containerModal
	);
};

Modal.protoType = {
	onClose: PropTypes.func,
	children: PropTypes.element,
	classModal: PropTypes.string,
	classButton: PropTypes.string,
};
