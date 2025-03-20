import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import PropTypes from 'prop-types';

export const PersonalAccount = (props) => {
	const {
		setPageConstructor,
		setPageCheckList,
		setPagePersonalAccount,
		activePage,
	} = props;
	return (
		<Layout
			setPageConstructor={setPageConstructor}
			setPageCheckList={setPageCheckList}
			setPagePersonalAccount={setPagePersonalAccount}
			activePage={activePage}>
			<Container>
				<main> В активной разработке</main>
			</Container>
		</Layout>
	);
};

PersonalAccount.propTypes = {
	setPageConstructor: PropTypes.func,
	setPageCheckList: PropTypes.func,
	setPagePersonalAccount: PropTypes.func,
	activePage: PropTypes.string,
	data: PropTypes.array,
};
