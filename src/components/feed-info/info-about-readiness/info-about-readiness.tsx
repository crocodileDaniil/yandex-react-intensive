import styles from './styles.module.css';

type TPropsComponent = {
	feedCompleted: Array<number>;
	feedJobs: Array<number>;
};

const countOrderColumn = 5;

export const InfoAboutReadiness = ({
	feedCompleted,
	feedJobs,
}: TPropsComponent) => {
	return (
		<div className={styles.container}>
			<div className={styles.column}>
				<h3 className={styles.heading}>Готовы:</h3>
				{renderOrders(feedCompleted, styles.done)}
			</div>

			<div className={styles.column}>
				<h3 className={styles.heading}>В работе:</h3>
				{renderOrders(feedJobs, styles.pending)}
			</div>
		</div>
	);
};

const renderOrders = (orders: number[], style?: string) => {
	const countColumn = Math.ceil(orders.length / countOrderColumn);
	const ordersColumns = [];
	for (let i = 0; i < countColumn; i++) {
		ordersColumns.push(
			orders.slice(i * countOrderColumn, (i + 1) * countOrderColumn)
		);
	}

	return (
		<div
			className={styles.orders}
			style={{ gridTemplateColumns: `repeat(${countColumn}, 1fr)` }}>
			{ordersColumns.map((orders, index) => (
				<RenderColumn key={index} elements={orders} style={style} />
			))}
		</div>
	);
};

type RenderColumnProps = {
	elements: number[];
	style?: string;
};
const RenderColumn = ({ elements, style }: RenderColumnProps) => {
	return (
		<div className={styles['column-order']}>
			{elements.map((order, index) => (
				<p
					key={index}
					className={`${styles.order} ${style} text text_type_digits-medium`}>
					{order}
				</p>
			))}
		</div>
	);
};
