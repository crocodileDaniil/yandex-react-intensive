import { TPropsChildren, TPropsClassName } from '@utils/types';
import styles from './styles.module.css';

type TContainerType = TPropsClassName & TPropsChildren;

export const Container = ({ children, className = '' }: TContainerType) => {
	return <div className={`${styles.container} ${className}`}>{children}</div>;
};
