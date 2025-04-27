import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const NavElement = ({ children, name, classNameText }) => {
	return (
		<div href='#' className={`${styles['nav-element']}`}>
			{children}
			<p className={classNameText}>{name}</p>
		</div>
	);
};

NavElement.propTypes = {
	children: PropTypes.element.isRequired,
	name: PropTypes.string.isRequired,
	classNameText: PropTypes.string.isRequired,
};
