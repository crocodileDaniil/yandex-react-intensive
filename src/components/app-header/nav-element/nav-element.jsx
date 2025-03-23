import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const NavElement = ({
	children,
	name,
	classNameText,
	classNameElement,
	onClick,
}) => {
	return (
		<a
			href='#'
			onClick={onClick}
			className={`${classNameElement} ${styles['nav-element']}`}>
			{children}
			<p className={classNameText}>{name}</p>
		</a>
	);
};

NavElement.propTypes = {
	children: PropTypes.element,
	name: PropTypes.string,
	classNameText: PropTypes.string,
	classNameElement: PropTypes.string,
	onClick: PropTypes.func,
};
