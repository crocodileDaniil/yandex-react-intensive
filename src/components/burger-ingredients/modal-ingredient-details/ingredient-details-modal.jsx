import { useEffect } from 'react';
import PropTypes, { element } from 'prop-types';
import { ingredientType } from '@utils/types';
import { Modal } from '../../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import {
	getDataIngredientDetails,
	removeIngredientDetails,
} from '@services/ingredient-info/reducer';
import styles from './styles.module.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getIngredients } from '@services/ingredients/reducer';

export const IngredientDetailsModal = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const ingredients = useSelector(getIngredients);
	const ingredientId = location.pathname.split('/')[2];
	const ingredient = ingredients.find(
		(element) => element._id === ingredientId
	);
	// console.log(location.pathname.split('/'));
	// console.log(ingredients);
	// console.log(ingredientId);
	// console.log(ingredient);
	const { name, calories, fat, proteins, carbohydrates, image } = ingredient;
	const onClose = () => {
		navigate('/', { replace: true });
	};

	const modalStylesClass = `${styles.modal} pt-10 pr-10 pl-10 pb-15`;
	const buttonStylesClass = styles.close ? `${styles.close}` : ' ';

	return (
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
		</Modal>
	);
};

// IngredientDetails.propTypes = {
// 	onClose: PropTypes.func,
// 	dataIngredient: ingredientType,
// };
