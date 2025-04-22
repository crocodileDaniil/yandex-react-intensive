import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useForm } from '@utils/custom-hooks';
import { Layout } from '../../layout/layout';
import { Container } from '../../container/container';
import { useNavigate } from 'react-router-dom';
import { pathPages } from '@utils/page-paths';

export const ForgotPassword = () => {
	const [form, onChange] = useForm({
		email: '',
	});
	const navigate = useNavigate();

	const onLoginClick = () => {
		navigate(pathPages.login);
	};

	return (
		<Layout>
			<Container className={styles.container}>
				<section className={`${styles.register} `}>
					<form action='' className={`${styles.form} mb-20`}>
						<h3 className='text text_type_main-medium'>
							Восстановление пароля
						</h3>
						<Input
							name='email'
							type='email'
							placeholder={form.email ? '' : 'Укажите e-mail'}
							onChange={onChange}
							value={form.email}
						/>
						<Button htmlType='submit' type='primary' size='large'>
							Восстановить
						</Button>
					</form>
					<p className={`${styles.login} mb-4`}>
						<span className='text text_type_main-default text_color_inactive'>
							Вы вспомнили пароль?
						</span>
						<Button
							onClick={onLoginClick}
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
