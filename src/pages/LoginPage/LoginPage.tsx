import { Button, Form, Input, notification } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import style from './LoginPage.module.scss'
import { useForm } from 'antd/es/form/Form'
import type { AuthData } from '../../types/account.types'
import { accountSignIn, fetchProfile } from '../../api/api'
import { useDispatch } from 'react-redux'
import { setProfile, setTokens } from '../../store/slices/userSlice'
import Loading from '../../components/Loading/Loading'
import { useState } from 'react'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function LoginPage() {
	const [formLogin] = useForm<AuthData>()
	const [api, contextHolder] = notification.useNotification()
	const [isLoading, setLoading] = useState<boolean>(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

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

	async function handleSubmitForm(values: AuthData) {
		setLoading(true)
		try {
			const tokensResponse = await accountSignIn({
				login: values.login,
				password: values.password,
			})

			const tokens = {
				accessToken: tokensResponse.accessToken,
				refreshToken: tokensResponse.refreshToken,
			}

			localStorage.setItem('tokens', JSON.stringify(tokens.refreshToken))
			dispatch(setTokens(tokens))

			const profile = await fetchProfile(tokens.accessToken)
			dispatch(setProfile(profile))
			navigate('/')
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error)
			openNotificationWithIcon('error', 'Ошибка входа', message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={style.layout_content}>
			{contextHolder}
			<h1>Авторизация</h1>
			{isLoading && <Loading />}
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

					<Form.Item>
						<Button type='primary' htmlType='submit'>
							Войти
						</Button>
					</Form.Item>
					<p>
						Нет аккаунта? <Link to='/registration'>Регистрация</Link>
					</p>
				</Form>
			)}
		</div>
	)
}
