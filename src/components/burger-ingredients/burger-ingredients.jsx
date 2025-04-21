import { IngredientDetailsModal } from './modal-ingredient-details/ingredient-details-modal';
import { useRef, useState } from 'react';
import { FilterIngredients } from './filter-tabs/tabs';
import { FILTER_DECRYPTION } from '@utils/filter-decryption';
import { getFilteredDataByCategory } from '@utils/helper-function';
import { Ingredients } from './ingredients/ingredients';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '@utils/types';
import { useSelector } from 'react-redux';
import { getActiveIngredientDetails } from '@services/ingredient-info/reducer';
import { getIngredients } from '@services/ingredients/selectors';

const categorysFilter = Object.keys(FILTER_DECRYPTION);
const categoryDecr = Object.values(FILTER_DECRYPTION);

export const BurgerIngredients = () => {
	const ingredients = useSelector(getIngredients);
	// лучше данные группировать в каждой секции или в родителе?
	const filterIngredients = getFilteredDataByCategory(ingredients, 'type');

	const [category, setCategory] = useState(categorysFilter[0]);
	const isOpenModal = useSelector(getActiveIngredientDetails);

	// const [currentTab, setCurrentTab] = useState('Булки');
	const containerRef = useRef(null);
	const tabsRef = useRef(null);

	const bunsRef = useRef(null);
	const saucesRef = useRef(null);
	const mainsRef = useRef(null);

	const sectionRefs = {
		Булки: bunsRef,
		Соусы: saucesRef,
		Начинки: mainsRef,
	};

	// При клике на таб — прокрутка с учётом высоты табов
	const handleTabClick = (name) => {
		const block = sectionRefs[name].current;
		const container = containerRef.current;
		const tabs = tabsRef.current;

		if (block && container && tabs) {
			const containerTop = container.getBoundingClientRect().top;
			const blockTop = block.getBoundingClientRect().top;
			const offset = blockTop - containerTop + container.scrollTop;

			const tabHeight = tabs.offsetHeight;

			container.scrollTo({
				top: offset - tabHeight, // учли высоту табов
				behavior: 'smooth',
			});
		}
	};

	// При скролле — определяем ближайший блок и обновляем текущий таб
	const handleScroll = () => {
		if (!containerRef.current || !tabsRef.current) return;

		const containerTop = containerRef.current.getBoundingClientRect().top;
		const tabsHeight = tabsRef.current.offsetHeight;

		const visibleSections = categorysFilter.map((name) => {
			const ref = sectionRefs[name].current;
			if (!ref) return { name, offset: Infinity };
			const rect = ref.getBoundingClientRect();
			return { name, offset: Math.abs(rect.top - containerTop - tabsHeight) };
		});

		visibleSections.sort((a, b) => a.offset - b.offset);
		const nearest = visibleSections[0];
		if (nearest.name !== category) {
			setCategory(nearest.name);
		}
	};

	return (
		<section className={styles.ingredients}>
			<p className='text text_type_main-large mb-5'>Соберите бургер</p>
			<FilterIngredients
				current={category}
				namesFilter={categorysFilter}
				setFilterIngredients={handleTabClick}
				tabsRef={tabsRef}
			/>
			<Ingredients
				handleScroll={handleScroll}
				refs={{
					containerRef: containerRef,
					bunsRef: bunsRef,
					saucesRef: saucesRef,
					mainsRef: mainsRef,
				}}
			/>
		</section>
	);
};

// BurgerIngredients.propTypes = {
// 	ingredients: PropTypes.arrayOf(ingredientType),
// };
