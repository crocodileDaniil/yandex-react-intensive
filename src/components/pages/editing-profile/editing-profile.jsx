import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useState } from 'react';
import { useForm } from '@utils/custom-hooks';
import { useSelector } from 'react-redux';
import { getUser } from '@services/user/reducer';

const initialFormState = {
	name: '',
	email: '',
	password: '',
};

export const EditingProfile = (props) => {
	const [form, onChange, setFormValue] = useForm(initialFormState);

	const [isVisiblePassword, setIsVisiblePassword] = useState(false);

	const user = useSelector(getUser)

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
					value={form.name || user.name}
				/>
				<Input
					name='email'
					type='email'
					placeholder={form.email ? '' : 'Логин'}
					icon={form.email ? 'CloseIcon' : 'EditIcon'}
					onChange={onChange}
					{...(form.email && { onIconClick: () => onIconClick('email') })}
					value={form.email || user.email}
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
