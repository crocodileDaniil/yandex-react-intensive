import { useSelector } from '@services/store';
import styles from './style.module.css';
import { getTotal } from '@services/ordersStream/reducer';

export const FeedTotal = () => {
	const total = useSelector(getTotal);

	return (
		<div>
			<p className='text text_type_main-medium'>Выполнено за все время:</p>
			<p className={`text text_type_digits-large ${styles.total}`}>{total}</p>
		</div>
	);
};
