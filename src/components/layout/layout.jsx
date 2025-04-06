import { AppHeader } from '../app-header/app-header';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const Layout = (props) => {
	//TODO: layout сделать grid эксперимент, посмотреть на практике
	return (
		<div className={styles.layout}>
			<AppHeader />
			<main className={`pb-10 ${styles.main}`}>{props.children}</main>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.element,
};
