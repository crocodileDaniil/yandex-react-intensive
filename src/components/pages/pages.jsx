import { Route, Routes } from 'react-router-dom';
import { CheckList } from './check-list/check-list';
import { PageConstructorBurger } from './page-constructor-burger/page-constructor-burger';
import { PersonalAccount } from './personal-account/personal-account';
import { pathPages } from '@utils/page-paths';
import { EditingProfile } from './editing-profile/editing-profile';
import { ProfileOrder } from './profile-order/profile-order';
import { Register } from './register/register';
import { Login } from './login/login';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';

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
				<Route path={pathPages.register} element={<Register />} />
				<Route path={pathPages.login} element={<Login />} />
				<Route path={pathPages.forgotPassword} element={<ForgotPassword />} />
				<Route path={pathPages.resetPassword} element={<ResetPassword />} />
				{/* <Route path='*' element={<NotFound404 />} /> */}
			</Routes>
		</>
	);
};
