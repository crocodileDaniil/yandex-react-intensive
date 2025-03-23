import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Container } from '../container/container';
import styles from './styles.module.css';
import { NavElement } from './nav-element/nav-element';
import PropTypes from 'prop-types';

const restaurantPages = ['constructor', 'check-list', 'personal-account'];
export const AppHeader = (props) => {
	const {
		setPageConstructor,
		setPageCheckList,
		setPagePersonalAccount,
		activePage,
	} = props;

	const _setPageConstructor = (e) => {
		e.preventDefault();
		setPageConstructor();
	};

	const _setPageCheckList = (e) => {
		e.preventDefault();
		setPageCheckList();
	};

	const _setPagePersonalAccount = (e) => {
		e.preventDefault();
		setPagePersonalAccount();
	};

	return (
		<header className={`${styles.header} mb-10`}>
			<Container>
				<nav className={styles.nav}>
					{/* целесообразно тут выносить это в отдельный компонент? потом ведь это будут ссылки изначально было так */}
					{/* <button onClick={_setPageConstructor} className={styles['nav-link']}>
						<BurgerIcon type='primary' />
						<p className='text text_type_main-default '>Burger constructor</p>
					</button> */}
					<section className={styles['burger-ui']}>
						<NavElement
							name='Burger constructor'
							classNameElement={styles['nav-link']}
							classNameText={
								activePage === restaurantPages[0]
									? 'text text_type_main-default'
									: 'text text_type_main-default text_color_inactive'
							}
							onClick={_setPageConstructor}>
							<BurgerIcon
								type={
									activePage === restaurantPages[0] ? 'primary' : 'secondary'
								}
							/>
						</NavElement>

						<NavElement
							name='CheckList'
							classNameText={
								activePage === restaurantPages[1]
									? 'text text_type_main-default'
									: 'text text_type_main-default text_color_inactive'
							}
							classNameElement={styles['nav-link']}
							onClick={_setPageCheckList}>
							<ListIcon
								type={
									activePage === restaurantPages[1] ? 'primary' : 'secondary'
								}
							/>
						</NavElement>
					</section>
					<Logo />
					<NavElement
						name='Личный кабинет'
						classNameText={
							activePage === restaurantPages[2]
								? 'text text_type_main-default'
								: 'text text_type_main-default text_color_inactive'
						}
						classNameElement={styles['nav-link']}
						onClick={_setPagePersonalAccount}>
						<ProfileIcon
							type={activePage === restaurantPages[2] ? 'primary' : 'secondary'}
						/>
					</NavElement>
				</nav>
			</Container>
		</header>
	);
};

AppHeader.propTypes = {
	setPageConstructor: PropTypes.func,
	setPageCheckList: PropTypes.func,
	setPagePersonalAccount: PropTypes.func,
	activePage: PropTypes.string,
};
