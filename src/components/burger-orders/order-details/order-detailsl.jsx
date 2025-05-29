import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import { OderDetailsModal } from '../order-details-modal/order-details-modal';
import styles from './styles.module.css';

export const OderDetails = () => {
	return (
		<Layout>
			<Container className={styles.container}>
				<OderDetailsModal />
			</Container>
		</Layout>
	);
};
