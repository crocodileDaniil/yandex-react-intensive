import { AppHeader } from '../app-header/app-header';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export const Layout = (props) => {
	const {
		setPageConstructor,
		setPageCheckList,
		setPagePersonalAccount,
		activePage,
	} = props;
	//TODO: layout сделать grid эксперимент, посмотреть на практике
	return (
		<div className={styles.layout}>
			<AppHeader
				setPageConstructor={setPageConstructor}
				setPageCheckList={setPageCheckList}
				setPagePersonalAccount={setPagePersonalAccount}
				activePage={activePage}
			/>
			<main className={`pb-10 ${styles.main}`}>{props.children}</main>
		</div>
	);
};

Layout.propTypes = {
	setPageConstructor: PropTypes.func,
	setPageCheckList: PropTypes.func,
	setPagePersonalAccount: PropTypes.func,
	activePage: PropTypes.string,
	children: PropTypes.element,
};
