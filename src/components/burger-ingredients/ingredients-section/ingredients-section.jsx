import { ingredientType } from '@utils/types';
import { Ingredient } from '../ingredient/ingredient';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';

export const IngredientsSection = (props) => {
	const { name, data, countIngredient, sectionRef } = props;

	const location = useLocation();

	return (
		<article>
			<p className='text text_type_main-medium mb-6' ref={sectionRef}>
				{name}
			</p>
			<div className={`${styles['ingr-section']} pl-4 pb-10 pr-1`}>
				{data.map((ingredient) => (
					<Link
						key={ingredient['_id']}
						to={`${pathPages.ingredients}/${ingredient['_id']}`}
						state={{ backgroundLocation: { ...location } }}>
						<Ingredient
							key={ingredient['_id']}
							{...ingredient}
							count={countIngredient[ingredient['_id']]}
						/>
					</Link>
				))}
			</div>
		</article>
	);
};

IngredientsSection.propTypes = {
	name: PropTypes.string,
	data: PropTypes.arrayOf(ingredientType),
	sectionRef: PropTypes.any,
	countIngredient: PropTypes.objectOf(PropTypes.number),
};
