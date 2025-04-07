import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const FilterIngredients = (props) => {
	const { namesFilter, current, setFilterIngredients, tabsRef } = props;
	//TODO: промамить фильтром и вернуть табы
	return (
		<div style={{ display: 'flex' }} className='mb-10' ref={tabsRef}>
			{namesFilter.map((name) => {
				return (
					<Tab
						key={name}
						value={name}
						active={current === name}
						onClick={() => setFilterIngredients(name)}>
						{name}
					</Tab>
				);
			})}
		</div>
	);
};

FilterIngredients.propTypes = {
	namesFilter: PropTypes.arrayOf(PropTypes.string),
	current: PropTypes.string,
	setFilterIngredients: PropTypes.func,
	tabsRef: PropTypes.any,
};
