import { useEffect } from 'react';
import { Container } from '../../container/container';
import { Layout } from '../../layout/layout';
import { useDispatch } from '@utils/custom-hooks';
import { connect, disconnect } from '@services/ordersStream/actions';
import { urlWsConnect } from '@utils/url';
import { Feed } from '../../feed/feed';

import styles from './styles.module.css';
export const CheckList = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(connect(urlWsConnect()));

		return () => {
			dispatch(disconnect());
		};
	}, []);

	return (
		<Layout>
			<Container>
				<main className={styles.main}>
					<Feed />
				</main>
			</Container>
		</Layout>
	);
};

CheckList.propTypes = {};
