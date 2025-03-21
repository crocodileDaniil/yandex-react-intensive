import { getKeyToValue } from '@utils/helper-function';
import { IngredientsSection } from '../ingredients-section/ingredients-section';
import { FILTER_DECRYPTION } from '@utils/filter-decryption';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const Ingredients = (props) => {
	const { ingredientsDecr, ingredients, onOpenModal } = props;

	return (
		<div
			data-scroll
			className={`${styles.ingredients} custom-scroll ${styles.scroll}`}>
			{ingredientsDecr.map((decr) => (
				<IngredientsSection
					key={decr}
					name={getKeyToValue(FILTER_DECRYPTION, decr)}
					data={ingredients[decr]}
					onOpenModal={onOpenModal}
				/>
			))}
		</div>
	);
};

Ingredients.propTypes = {
	ingredientsDecr: PropTypes.arrayOf(PropTypes.string),
	ingredients: PropTypes.shape({
		bun: PropTypes.arrayOf(
			PropTypes.shape({
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
			})
		),
		main: PropTypes.arrayOf(
			PropTypes.shape({
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
			})
		),
		sauce: PropTypes.arrayOf(
			PropTypes.shape({
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
			})
		),
	}),
	onOpenModal: PropTypes.func,
};
