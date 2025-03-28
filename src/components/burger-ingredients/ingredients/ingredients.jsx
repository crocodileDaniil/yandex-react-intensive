import { getKeyToValue } from '@utils/helper-function';
import { IngredientsSection } from '../ingredients-section/ingredients-section';
import { FILTER_DECRYPTION } from '@utils/filter-decryption';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '@utils/types';

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
		bun: PropTypes.arrayOf(ingredientType),
		main: PropTypes.arrayOf(ingredientType),
		sauce: PropTypes.arrayOf(ingredientType),
	}),
	onOpenModal: PropTypes.func,
};
