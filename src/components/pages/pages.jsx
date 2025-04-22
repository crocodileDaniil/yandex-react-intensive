import { Route, Routes, useLocation } from 'react-router-dom';
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
import { Page404 } from './error404-page/erro404-page';
import { ProductDetails } from './product-info/product-details';
import { IngredientDetailsModal } from '../burger-ingredients/modal-ingredient-details/ingredient-details-modal';
import { OnlyAuth } from '../protected/protected';

export const Pages = () => {
	const location = useLocation();
	let state = location.state || {};
	// console.log(location);

	

	return (
		<>
			<Routes location={state?.backgroundLocation || location}>
				{/* домашняя страницы */}
				<Route path={pathPages.home} element={<PageConstructorBurger />} />
				<Route path={pathPages.checkList} element={<CheckList />} />
				<Route
					path={pathPages.personalAccount}
					element={<OnlyAuth component={<PersonalAccount />} />}>
					<Route
						path={pathPages.editingProfile}
						element={<OnlyAuth component={<EditingProfile />} />}
					/>
					<Route
						path={pathPages.profileOrders}
						element={<OnlyAuth component={<ProfileOrder />} />}
					/>
				</Route>
				<Route path={pathPages.register} element={<Register />} />
				<Route path={pathPages.login} element={<Login />} />
				<Route path={pathPages.forgotPassword} element={<ForgotPassword />} />
				<Route path={pathPages.resetPassword} element={<ResetPassword />} />
				<Route
					path={`${pathPages.ingredients}/:id`}
					element={<ProductDetails />}
				/>
				<Route path='*' element={<Page404 />} />
			</Routes>
			{state?.backgroundLocation && (
				<Routes>
					<Route
						path={`${pathPages.ingredients}/:id`}
						element={<IngredientDetailsModal />}
					/>
				</Routes>
			)}
		</>
	);
};
