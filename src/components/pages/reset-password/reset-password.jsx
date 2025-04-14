import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useForm } from '@utils/custom-hooks';
import { useState } from 'react';
import { Layout } from '../../layout/layout';
import { Container } from '../../container/container';

export const ResetPassword = () => {
	const [form, onChange] = useForm({
		code: '',
		password: '',
	});

	const [isVisiblePassword, setIsVisiblePassword] = useState(false);
	return (
		<Layout>
			<Container className={styles.container}>
				<section className={`${styles.register} `}>
					<form action='' className={`${styles.form} mb-20`}>
						<h3 className='text text_type_main-medium'>Восстановление пароля</h3>

						<Input
							name='password'
							type={isVisiblePassword ? 'text' : 'password'}
							placeholder={form.password ? '' : 'Введите новый пароль'}
							{...(isVisiblePassword
								? { icon: 'HideIcon' }
								: { icon: 'ShowIcon' })}
							onChange={onChange}
							value={form.password}
							onIconClick={() => setIsVisiblePassword(!isVisiblePassword)}
						/>
						<Input
							name='code'
							type='text'
							placeholder={form.code ? '' : 'Введите код из письма'}
							onChange={onChange}
							value={form.code}
						/>
						<Button htmlType='submit' type='primary' size='large'>
							Войти
						</Button>
					</form>
					<p className={`${styles.login} mb-4`}>
						<span className='text text_type_main-default text_color_inactive'>
							Вспомнил пароль?
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
