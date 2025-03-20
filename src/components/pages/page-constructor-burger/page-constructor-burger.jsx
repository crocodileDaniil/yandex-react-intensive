import { getFilteredDataByCategory } from '@utils/helper-function';
import { BurgerConstructor } from '../../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../../burger-ingredients/burger-ingredients';
import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import styles from './style.module.css';
import PropTypes from 'prop-types';

export const PageConstructorBurger = (props) => {
	const {
		setPageConstructor,
		setPageCheckList,
		setPagePersonalAccount,
		activePage,
		data,
	} = props;

	const groupIngredients = getFilteredDataByCategory(data, 'type');
	const resultBurger = {
		bun: groupIngredients.bun[0],
		filling: [
			groupIngredients.main[0],
			groupIngredients.sauce[0],
			groupIngredients.main[3],
			groupIngredients.main[4],
			groupIngredients.main[6],
			groupIngredients.sauce[3],
			groupIngredients.main[7],
			groupIngredients.main[3],
			groupIngredients.sauce[1],
		],
	};
	return (
		<Layout
			setPageConstructor={setPageConstructor}
			setPageCheckList={setPageCheckList}
			setPagePersonalAccount={setPagePersonalAccount}
			activePage={activePage}>
			<Container className={styles['container-main']}>
				<>
					<BurgerIngredients ingredients={data} />
					<BurgerConstructor resultBurger={resultBurger} />
				</>
			</Container>
		</Layout>
	);
};

PageConstructorBurger.propTypes = {
	setPageConstructor: PropTypes.func,
	setPageCheckList: PropTypes.func,
	setPagePersonalAccount: PropTypes.func,
	activePage: PropTypes.string,
	data: PropTypes.array,
};
