import styles from './styles.module.css';
import PropTypes from 'prop-types';
import { IngredientConstructor } from './ingredient-constructor/ingredient-constructor';
import { PlaceOrder } from './place-order/place-order';
import { useState } from 'react';
import { OrderDetails } from './modal-order-details/modal-order-details';

export const BurgerConstructor = (props) => {
	const [isOpenModal, setIsOpen] = useState(false);

	const { resultBurger } = props;
	const bun = resultBurger.bun;
	const filling = resultBurger.filling;

	return (
		<section className={`${styles.constructor} pt-25`}>
			<div className='but mb-4 mr-4'>
				{' '}
				<IngredientConstructor
					type='top'
					text={bun.name}
					thumbnail={bun.image}
					price={bun.price}
					isLocked={true}
				/>{' '}
			</div>
			<div className={`${styles.filling} ${styles.min} mb-4`}>
				{filling.map((fil, id) => (
					<IngredientConstructor
						key={id}
						text={fil.name}
						thumbnail={fil.image}
						price={fil.price}
					/>
				))}
			</div>
			<div className='but mr-4 mb-10'>
				{' '}
				<IngredientConstructor
					type='bottom'
					text={bun.name}
					thumbnail={bun.image}
					price={bun.price}
					isLocked={true}
				/>{' '}
			</div>
			<PlaceOrder openModal={() => setIsOpen(true)} />
			{isOpenModal && <OrderDetails onClose={() => setIsOpen(false)} />}
		</section>
	);
};

BurgerConstructor.propTypes = {
	resultBurger: PropTypes.object,
};
