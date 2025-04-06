import styles from './style.module.css';
import PropTypes from 'prop-types';

export const IngredientPlace = ({ type, text }) => {
	return (
		<article className={`${styles.element} ${styles[type]} mr-1`}>
			<p className='text text_type_main-default'>{text} </p>
		</article>
	);
};

IngredientPlace.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
};
