import { Route, Routes } from 'react-router-dom';
import { CheckList } from './check-list/check-list';
import { PageConstructorBurger } from './page-constructor-burger/page-constructor-burger';
import { PersonalAccount } from './personal-account/personal-account';
import { pathPages } from '@utils/page-paths';
import { EditingProfile } from './editing-profile/editing-profile';
import { ProfileOrder } from './profile-order/profile-order';

export const Pages = () => {
	return (
		<>
			<Routes>
				{/* домашняя страницы */}
				<Route path={pathPages.home} element={<PageConstructorBurger />} />
				<Route path={pathPages.checkList} element={<CheckList />} />
				<Route path={pathPages.personalAccount} element={<PersonalAccount />}>
					<Route path={pathPages.editingProfile} element={<EditingProfile />} />
					<Route path={pathPages.profileOrders} element={<ProfileOrder />} />
				</Route>
				{/* <Route path='*' element={<NotFound404 />} /> */}
			</Routes>
		</>
	);
};
