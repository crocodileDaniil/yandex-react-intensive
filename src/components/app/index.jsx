import { useEffect, useState } from 'react';
import { PageConstructorBurger } from '../pages/page-constructor-burger/page-constructor-burger';
import { CheckList } from '../pages/check-list/check-list';
import { MOCK_DATA } from '../../constants/mock';
import { PersonalAccount } from '../pages/persanal-account/personal-account';
import { url } from '@utils/url';
import { CometLoader } from '../loader/comet-loader';
import { Error } from '../error/error';

//почему этот импорт не работает?
// import { MOCK_DATA } from '@constants/mock';

const restaurantPages = ['constructor', 'check-list', 'personal-account'];

export const App = () => {
	const [page, setPage] = useState(restaurantPages[0]);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({
		hasError: false,
		errorMessage: '',
	});

	useEffect(() => {
		const getIngredients = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					setLoading(false);
					setError({
						hasError: true,
						errorMessage: 'Error loading data',
					});
					throw new Error('Error loading data');
				}
				const data = await response.json();
				setData(data.data);
				setLoading(false);
				setError({
					...error,
					hasError: false,
				});
			} catch (err) {
				setError({
					hasError: true,
					errorMessage: err.message,
				});
				setLoading(false);
			}
		};

		getIngredients();
	}, []);

	// здесь оборачивать не обязаятельно?
	const setPageConstructor = () => {
		setPage(restaurantPages[0]);
	};

	const setPageCheckList = () => {
		setPage(restaurantPages[1]);
	};

	const setPagePersonalAccount = () => {
		setPage(restaurantPages[2]);
	};

	return loading ? (
		<CometLoader />
	) : !error.hasError ? (
		<>
			{page === restaurantPages[0] ? (
				<PageConstructorBurger
					setPageConstructor={setPageConstructor}
					setPageCheckList={setPageCheckList}
					setPagePersonalAccount={setPagePersonalAccount}
					activePage={page}
					data={data}
				/>
			) : null}
			{page === restaurantPages[1] ? (
				<CheckList
					setPageConstructor={setPageConstructor}
					setPageCheckList={setPageCheckList}
					setPagePersonalAccount={setPagePersonalAccount}
					activePage={page}
					data={data}
				/>
			) : null}
			{page === restaurantPages[2] ? (
				<PersonalAccount
					setPageConstructor={setPageConstructor}
					setPageCheckList={setPageCheckList}
					setPagePersonalAccount={setPagePersonalAccount}
					activePage={page}
					data={data}
				/>
			) : null}
		</>
	) : (
		<Error text={error.errorMessage} />
	);
};
