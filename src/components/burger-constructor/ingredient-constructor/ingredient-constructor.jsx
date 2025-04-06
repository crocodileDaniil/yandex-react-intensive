import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import styles from './styles.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { ItemDropTypes } from '@utils/items-drop-types';
import { useDispatch } from 'react-redux';
import { swapIngredient } from '@services/constructor/reducer';

export const IngredientConstructor = (props) => {
	const { name, image, isLocked, type, price, uniqueId, index } = props;
	const ref = useRef(null);
	const dispatch = useDispatch();
	const [{}, drop] = useDrop({
		accept: ItemDropTypes.INGREDIENT_CONSTRUCTOR_SWAP,
		collect(monitor) {},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const fromIndex = item.index;
			const toIndex = index;
			if (fromIndex === toIndex) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (fromIndex < toIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (fromIndex > toIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			dispatch(swapIngredient({ fromIndex, toIndex }));

			item.index = toIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: ItemDropTypes.INGREDIENT_CONSTRUCTOR_SWAP,
		item: () => {
			return { index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const styleDrag = isDragging ? 'drag-item' : '';
	drag(drop(ref));
	return (
		<article
			className={`${styles.element} ${styles[styleDrag]} mr-1`}
			ref={ref}>
			{!isLocked ? <DragIcon type='primary' /> : null}
			<ConstructorElement
				text={name}
				thumbnail={image}
				price={price}
				isLocked={isLocked}
				type={type}
			/>
		</article>
	);
};

IngredientConstructor.propTypes = {
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
	type: PropTypes.string,
	isLocked: PropTypes.bool,
	uniqueId: PropTypes.string,
	index: PropTypes.number
};
