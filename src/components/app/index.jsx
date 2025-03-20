import { useCallback, useState } from 'react';
import { PageConstructorBurger } from '../pages/page-constructor-burger/page-constructor-burger';
import { CheckList } from '../pages/check-list/check-list';
import { MOCK_DATA } from '../../constants/mock';
import { PersonalAccount } from '../pages/persanal-account/personal-account';

//почему этот импорт не работает?
// import { MOCK_DATA } from '@constants/mock';

const restaurantPages = ['constructor', 'check-list', 'personal-account'];

export const App = () => {
	const [page, setPage] = useState(restaurantPages[0]);

	// здесь оборачивать не обязаятельно?
	const setPageConstructor = useCallback(() => {
		setPage(restaurantPages[0]);
	}, []);

	const setPageCheckList = () => {
		setPage(restaurantPages[1]);
	};

	const setPagePersonalAccount = () => {
		setPage(restaurantPages[2]);
	};

	return (
		<>
			{page === restaurantPages[0] ? (
				<PageConstructorBurger
					setPageConstructor={setPageConstructor}
					setPageCheckList={setPageCheckList}
					setPagePersonalAccount={setPagePersonalAccount}
					activePage={page}
					data={MOCK_DATA}
				/>
			) : null}
			{page === restaurantPages[1] ? (
				<CheckList
					setPageConstructor={setPageConstructor}
					setPageCheckList={setPageCheckList}
					setPagePersonalAccount={setPagePersonalAccount}
					activePage={page}
					data={MOCK_DATA}
				/>
			) : null}
			{page === restaurantPages[2] ? (
				<PersonalAccount
					setPageConstructor={setPageConstructor}
					setPageCheckList={setPageCheckList}
					setPagePersonalAccount={setPagePersonalAccount}
					activePage={page}
					data={MOCK_DATA}
				/>
			) : null}
		</>
	);
};
