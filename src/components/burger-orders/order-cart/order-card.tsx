import {
	TOrder,
	translateStatusOrder,
} from '@utils/types/types-orders-stream/types';
import styles from './styles.module.css';
import { useSelector } from '@services/store';
import { getMapIngredients } from '@services/ingredients/reducer';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ImageIngredients } from '../image-ingredients/image-ingredients';

export const OrderCard = ({
	_id,
	updatedAt,
	status,
	number,
	ingredients,
	name,
}: TOrder) => {
	const ingredientsMap = useSelector(getMapIngredients);

	const price = ingredients.reduce(
		(acc, ingredient) => acc + ingredientsMap[ingredient].price,
		0
	);

	// const keysStatus = Object.keys(translateStatusOrder);
	const statusOrder = translateStatusOrder[status]
		? translateStatusOrder[status]
		: 'Отменён';

	const statusStyle = translateStatusOrder[status] ? status : 'repeal';

	return (
		<div className={styles.card}>
			<div className={styles['card-header']}>
				<p
					className={`${styles.number} text text_type_digits-default`}>{`#${number}`}</p>
				{/* <p className={`${styles.date}`}>{updatedAt}</p> */}
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(updatedAt)}
				/>
			</div>
			<div>
				<p className={`${styles.name} text text_type_main-medium`}>{name}</p>
				<p className={`${styles[statusStyle]}`}>{statusOrder}</p>
			</div>
			<div className={`${styles.footer}`}>
				<ImageIngredients ingredients={ingredients} />
				<div className={styles.price}>
					<p className='text text_type_digits-default'>{price}</p>{' '}
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
