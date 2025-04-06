import { useEffect } from 'react';
import { PageConstructorBurger } from '../pages/page-constructor-burger/page-constructor-burger';
import { CheckList } from '../pages/check-list/check-list';
import { PersonalAccount } from '../pages/personal-account/personal-account';
import { CometLoader } from '../loader/comet-loader';
import { Error } from '../error/error';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredients } from '@services/ingredients/action';
import { restaurantPages } from '@utils/restaurantPages';
import {
	getIngredients,
	getIngredientsError,
	getIngredientsHasError,
	getIngredientsLoading,
} from '@services/ingredients/reducer';
import { getPage } from '@services/pages/reducer';

export const App = () => {
	const page = useSelector(getPage);
	const data = useSelector(getIngredients);
	const loading = useSelector(getIngredientsLoading);
	const hasError = useSelector(getIngredientsHasError);
	const errorMessage = useSelector(getIngredientsError);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllIngredients());
	}, []);

	return !data.length ? (
		loading && <CometLoader />
	) : !hasError ? (
		<>
			{page === restaurantPages[0] ? <PageConstructorBurger /> : null}
			{page === restaurantPages[1] ? <CheckList data={data} /> : null}
			{page === restaurantPages[2] ? <PersonalAccount data={data} /> : null}
		</>
	) : (
		<Error text={errorMessage} />
	);
};
