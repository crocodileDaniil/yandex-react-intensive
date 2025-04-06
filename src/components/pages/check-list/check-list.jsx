import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import PropTypes from 'prop-types';

export const CheckList = (props) => {
	const { data } = props;
	return (
		<Layout>
			<Container>
				<main> пока пусто </main>
			</Container>
		</Layout>
	);
};

CheckList.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			type: PropTypes.string,
			proteins: PropTypes.number,
			fat: PropTypes.number,
			carbohydrates: PropTypes.number,
			calories: PropTypes.number,
			price: PropTypes.number,
			image: PropTypes.string,
			image_mobile: PropTypes.string,
			image_large: PropTypes.string,
			__v: PropTypes.number,
		})
	),
};
