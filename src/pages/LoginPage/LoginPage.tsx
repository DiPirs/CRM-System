import { Button, Checkbox, Form, Input, notification } from 'antd'
import { Link } from 'react-router-dom'
import style from './LoginPage.module.scss'
import { useForm } from 'antd/es/form/Form'
import type { AuthData } from '../../types/account.types'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function LoginPage() {
	const [formLogin] = useForm<AuthData>()
	const [api, contextHolder] = notification.useNotification()

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
		openNotificationWithIcon('success', 'Успешный вход', 'Здравствуйте!')
		formLogin.resetFields()
	}
	return (
		<div className={style.layout_content}>
			{contextHolder}
			<h1>Авторизация</h1>
			<Form
				form={formLogin}
				name='basic'
				initialValues={{ remember: true }}
				layout='vertical'
				onFinish={handleSubmitForm}
				autoComplete='off'
			>
				<span style={{ fontSize: '18px' }}>Логин</span>
				<Form.Item
					name='login'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
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
					<Input placeholder='Введите ваш логин' />
				</Form.Item>

				<span style={{ fontSize: '18px' }}>Пароль</span>
				<Form.Item
					name='password'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
					]}
				>
					<Input.Password placeholder='Введите ваш пароль' />
				</Form.Item>

				<Form.Item name='remember' valuePropName='checked' label={null}>
					<Checkbox>Запомнить меня</Checkbox>
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Регистрация
					</Button>
				</Form.Item>
				<p>
					Нет аккаунта? <Link to='/registration'>Регистрация</Link>
				</p>
			</Form>
		</div>
	)
}
