import { Ingredient } from '../ingredient/ingredient';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const IngredientsSection = (props) => {
	const { name, data, onOpenModal } = props;
	return (
		<article>
			<p className='text text_type_main-medium mb-6'> {name} </p>
			<div className={`${styles['ingr-section']} pl-4 pb-10 pr-1`}>
				{data.map((ingredient) => (
					<Ingredient
						key={ingredient['_id']}
						{...ingredient}
						onOpenModal={onOpenModal}
					/>
				))}
			</div>
		</article>
	);
};

IngredientsSection.propTypes = {
	name: PropTypes.string,
	data: PropTypes.arrayOf(
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
	onOpenModal: PropTypes.func,
};
