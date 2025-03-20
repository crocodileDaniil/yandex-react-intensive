import { useState } from 'react';
import { FilterIngredients } from './filter-tabs/tabs';
import { FILTER_DECRYPTION } from '@utils/filter-decryption';
import { getFilteredDataByCategory } from '@utils/helper-function';
import { Ingredients } from './ingredients/ingredients';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { IngredientDetails } from './modal-ingredient-details/ingredient-details';

const categorysFilter = Object.keys(FILTER_DECRYPTION);
const categoryDecr = Object.values(FILTER_DECRYPTION);

export const BurgerIngredients = (props) => {
	const [category, setCategory] = useState(categorysFilter[0]);
	const [isOpenModal, setOpenModal] = useState(false);
	const [dataModal, setDataModal] = useState(null);

	const { ingredients } = props;
	// лучше данные группировать в каждой секции или в родителе?
	const filterIngredients = getFilteredDataByCategory(ingredients, 'type');

	const openModal = (id) => {
		const data = ingredients.find((elem) => elem['_id'] === id);
		setOpenModal(true);
		setDataModal({
			name: data.name,
			calories: data.calories,
			carbohydrates: data.carbohydrates,
			fat: data.fat,
			proteins: data.proteins,
			image: data.image,
		});
	};

	return (
		<section className={styles.ingredients}>
			<p className='text text_type_main-large mb-5'>Соберите бургер</p>
			<FilterIngredients
				current={category}
				namesFilter={categorysFilter}
				setFilterIngredients={setCategory}
			/>
			<Ingredients
				ingredientsDecr={[...categoryDecr]}
				ingredients={filterIngredients}
				onOpenModal={openModal}
			/>
			{isOpenModal && (
				<IngredientDetails
					onClose={() => setOpenModal(false)}
					dataIngredient={dataModal}
				/>
			)}
		</section>
	);
};

BurgerIngredients.propTypes = {
	// ingredients: PropTypes.object,
	ingredients: PropTypes.array,
};
