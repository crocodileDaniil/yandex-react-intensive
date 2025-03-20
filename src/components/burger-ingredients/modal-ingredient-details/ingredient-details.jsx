import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { Modal } from '../../modal/modal';

const containerModal = document.getElementById('modal-root');

export const IngredientDetails = ({ dataIngredient, onClose }) => {
	const { name, calories, fat, proteins, carbohydrates, image } =
		dataIngredient;
	useEffect(() => {
		const closeOnEscape = (e) => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', closeOnEscape);
		return () => {
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [onClose]);

	const modalStylesClass = `${styles.modal} pt-10 pr-10 pl-10 pb-15`;
	const buttonStylesClass = styles.close ? `${styles.close}` : ' ';
	return ReactDOM.createPortal(
		<Modal
			onClose={onClose}
			classModal={modalStylesClass}
			classButton={buttonStylesClass}>
			<>
				<p className='text text_type_main-large'>Детали ингредиента</p>
				<img className={`${styles.image} mb-1`} src={image} alt='' />
				<p className={`text text_type_main-medium ${styles.name} mb-8`}>
					{name}
				</p>
				<div className={`${styles['ingredient-info']}`}>
					<div className={`${styles['info-block']}`}>
						<p
							className={`${styles['info-text']} text text_type_main-default text_color_inactive`}>
							Калории,ккал
						</p>
						<p
							className={`${styles['info-value']} text text_type_main-default text_color_inactive`}>
							{calories}
						</p>
					</div>
					<div className={`${styles['info-block']}`}>
						<p
							className={`${styles['info-text']} text text_type_main-default text_color_inactive`}>
							Белки, г
						</p>
						<p
							className={`${styles['info-value']} text text_type_main-default text_color_inactive`}>
							{proteins}
						</p>
					</div>
					<div className={`${styles['info-block']}`}>
						<p
							className={`${styles['info-text']} text text_type_main-default text_color_inactive`}>
							Жиры, г
						</p>
						<p
							className={`${styles['info-value']} text text_type_main-default text_color_inactive`}>
							{fat}
						</p>
					</div>
					<div className={`${styles['info-block']}`}>
						<p
							className={`${styles['info-text']} text text_type_main-default text_color_inactive`}>
							Углеводы, г
						</p>
						<p
							className={`${styles['info-value']} text text_type_main-default text_color_inactive`}>
							{carbohydrates}
						</p>
					</div>
				</div>
			</>
		</Modal>,
		containerModal
	);
};

IngredientDetails.propTypes = {
	name: PropTypes.string,
	calories: PropTypes.number,
	fat: PropTypes.number,
	proteins: PropTypes.number,
	carbohydrates: PropTypes.number,
	image: PropTypes.string,
};
