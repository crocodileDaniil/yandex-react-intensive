import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import PropTypes from 'prop-types';

export const CheckList = (props) => {
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
				<main> пока пусто </main>
			</Container>
		</Layout>
	);
};

CheckList.propTypes = {
	setPageConstructor: PropTypes.func,
	setPageCheckList: PropTypes.func,
	setPagePersonalAccount: PropTypes.func,
	activePage: PropTypes.string,
	data: PropTypes.array,
};
