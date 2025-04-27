import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import PropTypes from 'prop-types';
import { pathPages } from '@utils/page-paths';

import styles from './styles.module.css';
import { getLastPath } from '@utils/helper-function';
import { descriptionPersonalAccountPath } from '@utils/description-personal-account-path';
import { useDispatch } from 'react-redux';

export const PersonalAccount = () => {
	// const { data } = props;

	const location = useLocation();
	const lastPath = getLastPath(location.pathname);
	const description = descriptionPersonalAccountPath[lastPath];

	const dispatch = useDispatch();

	return (
		<Layout>
			<Container>
				<main className={styles.main}>
					<nav className={`${styles.nav} pl-2`}>
						<ul>
							<li className={`${styles.li}`}>
								<NavLink to={pathPages.editingProfile}>
									{({ isActive }) => (
										<p
											className={`text text_type_main-medium pt-6 pb-6 ${
												!isActive && 'text_color_inactive'
											}`}>
											Профиль
										</p>
									)}
								</NavLink>
							</li>
							<li className={`${styles.li}`}>
								<NavLink to={pathPages.profileOrders}>
									{({ isActive }) => (
										<p
											className={`text text_type_main-medium pt-6 pb-6 ${
												!isActive && 'text_color_inactive'
											}`}>
											История заказов
										</p>
									)}
								</NavLink>
							</li>
							<li className={`${styles.li}`}>
								<NavLink to={pathPages.profileExit}>
									{({ isActive }) => (
										<p
											className={`text text_type_main-medium pt-6 pb-6 ${
												!isActive && 'text_color_inactive'
											}`}>
											Выход
										</p>
									)}
								</NavLink>
							</li>
						</ul>
						<p
							className={`text text_type_main-default pr-3 ${styles.description}`}>
							{description}
						</p>
					</nav>
					<div>
						<Outlet />
					</div>
				</main>
			</Container>
		</Layout>
	);
};

PersonalAccount.propTypes = {};
