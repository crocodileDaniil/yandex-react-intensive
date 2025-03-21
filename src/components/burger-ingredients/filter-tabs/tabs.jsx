import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const FilterIngredients = (props) => {
	const { namesFilter, current } = props;
	const onClick = (value) => {
		props.setFilterIngredients(value);
	};
	//TODO: промамить фильтром и вернуть табы
	return (
		<div style={{ display: 'flex' }} className='mb-10'>
			<Tab
				value={namesFilter[0]}
				active={current === namesFilter[0]}
				onClick={() => onClick(namesFilter[0])}>
				{namesFilter[0]}
			</Tab>
			<Tab
				value={namesFilter[1]}
				active={current === namesFilter[1]}
				onClick={() => onClick(namesFilter[1])}>
				{namesFilter[1]}
			</Tab>
			<Tab
				value={namesFilter[2]}
				active={current === namesFilter[2]}
				onClick={() => onClick(namesFilter[2])}>
				{namesFilter[2]}
			</Tab>
		</div>
	);
};

FilterIngredients.propTypes = {
	namesFilter: PropTypes.arrayOf(PropTypes.string),
	current: PropTypes.string,
	setFilterIngredients: PropTypes.func,
};
