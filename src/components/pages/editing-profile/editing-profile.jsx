import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useState } from 'react';

const initialFormState = {
	name: '',
	email: '',
	password: '',
};

export const EditingProfile = (props) => {
	const [form, setFormValue] = useState(initialFormState);

	const [isVisiblePassword, setIsVisiblePassword] = useState(false);

	const onChange = (e) => {
		setFormValue({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const onIconClick = (key) => {
		setFormValue({
			...form,
			[key]: '',
		});
	};

	const resetAllForm = () => {
		setFormValue(initialFormState);
	};

	return (
		<div>
			<form action='' className={`${styles.form} mb-6`}>
				<Input
					name='name'
					type='text'
					placeholder={form.name ? '' : 'Имя'}
					icon={form.name ? 'CloseIcon' : 'EditIcon'}
					onChange={onChange}
					{...(form.name && { onIconClick: () => onIconClick('name') })}
					value={form.name}
				/>
				<Input
					name='email'
					type='email'
					placeholder={form.email ? '' : 'Логин'}
					icon={form.email ? 'CloseIcon' : 'EditIcon'}
					onChange={onChange}
					{...(form.email && { onIconClick: () => onIconClick('email') })}
					value={form.email}
				/>
				<Input
					name='password'
					type={isVisiblePassword ? 'text' : 'password'}
					placeholder={form.password ? '' : 'Пароль'}
					icon={form.password ? 'CloseIcon' : 'EditIcon'}
					{...(isVisiblePassword && !form.password && { icon: 'ShowIcon' })}
					onChange={onChange}
					value={form.password}
					success={true}
					onIconClick={() => setIsVisiblePassword(!isVisiblePassword)}
					{...(form.password && { onIconClick: () => onIconClick('password') })}
				/>
			</form>

			{(form.name || form.email || form.password) && (
				<div className={styles.actions}>
					<button
						className={`${styles.cancel} text text_type_main-medium`}
						onClick={resetAllForm}>
						Отмена
					</button>
					<Button htmlType='button' type='primary' size='large'>
						Сохранить
					</Button>
				</div>
			)}
		</div>
	);
};
