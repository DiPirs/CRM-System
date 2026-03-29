import style from './LoginPage.module.scss'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { NotificationType } from '../../types/component'
import type { AuthData, Token } from '../../types/authorization'
import type { Profile } from '../../types/user'
import { Button, Checkbox, Form, Input, notification, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { accountSingIn, fetchProfile } from '../../api/user'
import { setProfile } from '../../store/user/slices/userSlice'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

export default function LoginPage() {
	const [formLogin] = useForm<AuthData>()
	const [api, contextHolder] = notification.useNotification()
	const [isLoading, setLoading] = useState<boolean>(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function openNotificationWithIcon(
		type: NotificationType,
		title: string,
		description?: string,
	) {
		api[type]({
			message: `${title}`,
			description: `${description}`,
		})
	}

	async function handleSubmitForm(values: AuthData) {
		setLoading(true)
		try {
			const tokenResponse: Token = await accountSingIn({
				login: values.login,
				password: values.password,
			})
			const profile: Profile = await fetchProfile(tokenResponse.accessToken)

			dispatch(
				setProfile({
					token: tokenResponse,
					profile: profile,
					isAuthenticated: true,
				}),
			)

			localStorage.setItem(
				'refreshToken',
				JSON.stringify(tokenResponse.refreshToken),
			)

			await openNotificationWithIcon(
				'success',
				'Успешный вход',
				'Здравствуйте!',
			)
			formLogin.resetFields()
			navigate('/')
		} catch (err) {
			throw new Error('Ошибка', err)
		}
	}

	return (
		<div className={style.layout}>
			{contextHolder}
			<h1>Авторизация</h1>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
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
							{
								required: true,
								message: 'Поле обязательно для заполнения',
							},
							{
								validator: (_, value) => {
									if (!value || /^[a-zA-Z0-9\s.,!?]*$/.test(value)) {
										return Promise.resolve()
									}
									return Promise.reject(
										new Error('Логин должен быть написан латинскими буквами'),
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
							{
								required: true,
								message: 'Поле обязательно для заполнения',
							},
						]}
					>
						<Input.Password placeholder='Введите ваш пароль' />
					</Form.Item>

					<Form.Item name='remember' valuePropName='checked' label={null}>
						<Checkbox>Запомнить меня</Checkbox>
					</Form.Item>

					<Form.Item>
						<Space style={{ display: 'flex', justifyContent: 'center' }}>
							<Button type='primary' htmlType='submit'>
								Войти
							</Button>
						</Space>
					</Form.Item>
					<p>
						Нет аккаунта? <Link to='/registration'>Регистрация</Link>
					</p>
				</Form>
			)}
		</div>
	)
}
