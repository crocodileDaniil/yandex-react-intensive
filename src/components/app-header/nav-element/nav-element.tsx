import { TPropsChildren, TPropsClassName } from '@utils/types';
import styles from './styles.module.css';

type TNavElement = { name: string } & TPropsChildren & TPropsClassName;

export const NavElement = ({ children, name, className }: TNavElement) => {
	return (
		<div className={`${styles['nav-element']}`}>
			{children}
			<p className={className}>{name}</p>
		</div>
	);
};
