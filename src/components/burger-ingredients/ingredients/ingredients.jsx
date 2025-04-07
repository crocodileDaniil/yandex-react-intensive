import {
	getFilteredDataByCategory,
	getKeyToValue,
} from '@utils/helper-function';
import { IngredientsSection } from '../ingredients-section/ingredients-section';
import { FILTER_DECRYPTION } from '@utils/filter-decryption';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '@utils/types';
import { useSelector } from 'react-redux';
import { getIngredients } from '@services/ingredients/reducer';
import { useMemo } from 'react';
import {
	getAllIngredients,
	getBun,
	getFilling,
} from '@services/constructor/reducer';
import { REFS_TABS_DECRYPTION } from '@utils/refs-tabs-decryption';

const categoryDecr = Object.values(FILTER_DECRYPTION);

export const Ingredients = ({ refs, handleScroll }) => {
	const ingredients = useSelector(getIngredients);
	const fillingConstructor = useSelector(getAllIngredients);
	const activeBun = useSelector(getBun);
	const filterIngredients = getFilteredDataByCategory(ingredients, 'type');

	const countIngredient = useMemo(() => {
		const ingredientList = [...fillingConstructor];
		activeBun && ingredientList.push(activeBun, activeBun);
		return ingredientList.reduce((acc, fil) => {
			const filId = fil['_id'];
			if (acc[filId]) {
				acc[filId] = acc[filId] + 1;
			} else {
				acc[filId] = 1;
			}
			return acc;
		}, {});
	}, [fillingConstructor, activeBun]);

	return (
		<div
			data-scroll
			className={`${styles.ingredients} custom-scroll ${styles.scroll}`}
			ref={refs.containerRef}
			onScroll={handleScroll}>
			{categoryDecr.map((decr) => {
				const sectionRef = refs[REFS_TABS_DECRYPTION[decr]];
				return (
					<IngredientsSection
						key={decr}
						name={getKeyToValue(FILTER_DECRYPTION, decr)}
						data={filterIngredients[decr]}
						countIngredient={countIngredient}
						sectionRef={sectionRef}
					/>
				);
			})}
		</div>
	);
};

Ingredients.propTypes = {
	handleScroll: PropTypes.func,
	refs: PropTypes.shape({
		containerRef: PropTypes.any,
		bunsRef: PropTypes.any,
		saucesRef: PropTypes.any,
		mainsRef: PropTypes.any,
	}),
};
