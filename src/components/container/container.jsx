import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const Container = ({ children, className = '' }) => {
	return <div className={`${styles.container} ${className}`}>{children}</div>;
};

Container.propoTypes = {
	children: PropTypes.element,
	className: PropTypes.string,
};
