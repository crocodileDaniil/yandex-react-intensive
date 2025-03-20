import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

export const IngredientConstructor = (props) => {
	const { text, thumbnail, isLocked, type, price } = props;
	return (
		<article className={`${styles.element} mr-1`}>
			{!isLocked ? <DragIcon type='primary' /> : null}
			<ConstructorElement
				text={text}
				thumbnail={thumbnail}
				price={price}
				isLocked={isLocked}
				type={type}
			/>
		</article>
	);
};

IngredientConstructor.propTypes = {
	text: PropTypes.string,
	thumbnail: PropTypes.string,
	isLocked: PropTypes.bool,
	type: PropTypes.string,
	price: PropTypes.number,
};
