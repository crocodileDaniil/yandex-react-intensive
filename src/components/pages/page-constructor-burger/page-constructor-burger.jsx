import { BurgerConstructor } from '../../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../burger-ingredients/burger-ingredients';
import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import styles from './style.module.css';
import PropTypes from 'prop-types';

export const PageConstructorBurger = () => {
	// обернуть в memo, здесь фильтр, лучше в пропсах передать или всё делать в дочернем
	// const groupIngredients = useMemo(
	// 	() => getFilteredDataByCategory(data, 'type'),
	// 	[data]
	// );
	return (
		<Layout>
			<Container className={styles['container-main']}>
				<>
					<BurgerIngredients />
					<BurgerConstructor />
				</>
			</Container>
		</Layout>
	);
};

// PageConstructorBurger.propTypes = {
// 	data: PropTypes.arrayOf(ingredientType),
// };
