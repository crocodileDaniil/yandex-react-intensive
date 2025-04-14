import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import { useForm } from '@utils/custom-hooks';
import { useState } from 'react';
import { Layout } from '../../layout/layout';
import { Container } from '../../container/container';

export const Register = () => {
	const [form, onChange] = useForm({
		name: '',
		email: '',
		password: '',
	});

	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
	return (
		<Layout>
			<Container className={styles.container}>
				<section className={`${styles.register} `}>
					<form action='' className={`${styles.form} mb-20`}>
						<h3 className='text text_type_main-medium'>Регистрация</h3>
						<Input
							name='name'
							type='text'
							placeholder={form.name ? '' : 'Имя'}
							onChange={onChange}
							value={form.name}
						/>
						<Input
							name='email'
							type='email'
							placeholder={form.email ? '' : 'E-mail'}
							onChange={onChange}
							value={form.email}
						/>
						<Input
							name='password'
							type={isVisiblePassword ? 'text' : 'password'}
							placeholder={form.password ? '' : 'Пароль'}
							icon={form.password ? 'CloseIcon' : 'EditIcon'}
							{...(isVisiblePassword
								? { icon: 'HideIcon' }
								: { icon: 'ShowIcon' })}
							onChange={onChange}
							value={form.password}
							onIconClick={() => setIsVisiblePassword(!isVisiblePassword)}
						/>
						<Button htmlType='submit' type='primary' size='large'>
							Зарегестрироваться
						</Button>
					</form>
					<p className={styles.login}>
						<span className='text text_type_main-default text_color_inactive'>
							Уже зарегестрировались?
						</span>
						<Button
							htmlType='button'
							type='secondary'
							size='medium'
							extraClass={styles['button-in']}>
							Войти
						</Button>
					</p>
				</section>
			</Container>
		</Layout>
	);
};
