import { Button, Form, Input, notification, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import style from './RegistrationPage.module.scss'
import { useForm } from 'antd/es/form/Form'
import type { UserRegistration } from '../../types/account.types'
import { checkingPasswordMatch } from '../../utils/validate'
import { accountSingUp } from '../../api/api'

interface FieldType extends UserRegistration {
	userSecPassword: string
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function RegistrationPage() {
	const [formAccount] = useForm<FieldType>()
	const [api, contextHolder] = notification.useNotification()
	const navigate = useNavigate()

	const openNotificationWithIcon = (
		type: NotificationType,
		title: string,
		description?: string
	) => {
		api[type]({
			message: `${title}`,
			description: `${description}`,
		})
	}

	function handleSubmitForm(values: FieldType) {
		if (!checkingPasswordMatch(values.password, values.userSecPassword)) {
			formAccount.setFields([
				{
					name: 'password',
					errors: ['Пароли должны быть одинаковые'],
				},
				{
					name: 'userSecPassword',
					errors: ['Пароли должны быть одинаковые'],
				},
			])
			return
		}
		accountSingUp({
			login: values.login,
			username: values.username,
			password: values.password,
			email: values.email,
			phoneNumber: values?.phoneNumber,
		})
			.then(() => {
				openNotificationWithIcon(
					'success',
					'Успешная регистрация',
					'Поздравляю, вы теперь в системе!'
				)
				formAccount.resetFields()
				navigate('/login')
			})
			.catch(err => {
				openNotificationWithIcon('error', 'Ошибка регистрации', err)
			})
	}

	return (
		<div className={style.layout_content}>
			{contextHolder}
			<h1>Регистрация</h1>
			<Form
				form={formAccount}
				name='validateOnly'
				layout='vertical'
				autoComplete='off'
				onFinish={handleSubmitForm}
			>
				<span style={{ fontSize: '18px' }}>Имя</span>
				<Form.Item
					name='username'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
						{ max: 60, message: 'Имя не должно превышать 60 символов' },
					]}
				>
					<Input placeholder='Введите имя' />
				</Form.Item>

				<span style={{ fontSize: '18px' }}>Логин</span>
				<Form.Item
					name='login'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
						{ min: 2, message: 'Логин должен быть от 2 символов' },
						{ max: 64, message: 'Логин должен быть до 64 символов' },
						{
							validator: (_, value) => {
								if (!value || /^[a-zA-Z0-9\s.,!?]*$/.test(value)) {
									return Promise.resolve()
								}
								return Promise.reject(
									new Error('Логин должен быть написан латинскими буквами')
								)
							},
						},
					]}
				>
					<Input placeholder='Введите логин' />
				</Form.Item>

				<span style={{ fontSize: '18px' }}>Пароль</span>
				<Form.Item
					name='password'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
						{ min: 6, message: 'Пароль должен быть от 6 символов' },
						{ max: 60, message: 'Пароль должен быть до 60 символов' },
					]}
				>
					<Input.Password placeholder='Введите пароль' />
				</Form.Item>

				<span style={{ fontSize: '18px' }}>Повторите пароль</span>
				<Form.Item
					name='userSecPassword'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
						{ min: 6, message: 'Пароль должен быть от 6 символов' },
						{ max: 60, message: 'Пароль должен быть до 60 символов' },
					]}
				>
					<Input.Password placeholder='Повторите пароль' />
				</Form.Item>

				<span style={{ fontSize: '18px' }}>Почта</span>
				<Form.Item
					name='email'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
						{ type: 'email', message: 'Введите корректный email' },
					]}
				>
					<Input placeholder='Введите email' />
				</Form.Item>

				<span style={{ fontSize: '18px' }}>Телефон</span>
				<Form.Item
					name='phoneNumber'
					rules={[
						{
							validator: (_, value) => {
								if (!value || /^\+7\d{10}$/.test(value)) {
									return Promise.resolve()
								}
								return Promise.reject(new Error('Формат: +7(XXX)XXX-XX-XX'))
							},
						},
					]}
				>
					<Input placeholder='+7(XXX)XXX-XX-XX' />
				</Form.Item>

				<Form.Item>
					<Space style={{ display: 'flex', justifyContent: 'center' }}>
						<Button type='primary' htmlType='submit'>
							Регистрация
						</Button>
					</Space>
				</Form.Item>
				<p>
					Есть аккаунт? <Link to='/login'>Авторизоваться</Link>
				</p>
			</Form>
		</div>
	)
}
