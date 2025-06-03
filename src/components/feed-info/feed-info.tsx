import { getOrders } from '@services/ordersStream/reducer';
import { useSelector } from '@utils/custom-hooks';
import { InfoAboutReadiness } from './info-about-readiness/info-about-readiness';
import { FeedTotal } from './feed-total/feed-total';
import styles from './style.module.css';
import { FeedToDay } from './feed-to-day/feed-to-dayl';

const statusDone = 'done';

type TReduce = {
	feedCompleted: number[];
	feedJobs: number[];
};

export const FeedInfo = () => {
	const allOrders = useSelector(getOrders);

	const orderReadiness = allOrders.reduce(
		(acc: TReduce, order) => {
			if (order.status === statusDone) {
				acc.feedCompleted.push(order.number);
			} else {
				acc.feedJobs.push(order.number);
			}
			return acc;
		},
		{
			feedCompleted: [],
			feedJobs: [],
		}
	);

	return (
		<section className={styles.info}>
			<InfoAboutReadiness
				feedCompleted={orderReadiness.feedCompleted.slice(0, 10)}
				feedJobs={orderReadiness.feedJobs.slice(0, 10)}
			/>
			<FeedTotal />
			<FeedToDay />
		</section>
	);
};
