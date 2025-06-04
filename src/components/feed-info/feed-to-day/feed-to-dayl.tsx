import { useSelector } from '@utils/custom-hooks';
import styles from './style.module.css';
import { getTotalToDay } from '@services/ordersStream/reducer';

export const FeedToDay = () => {
	const total = useSelector(getTotalToDay);

	return (
		<div>
			<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
			<p className={`text text_type_digits-large ${styles.total}`}>{total}</p>
		</div>
	);
};
