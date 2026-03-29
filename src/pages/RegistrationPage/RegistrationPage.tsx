import style from './RegistrationPage.module.scss'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { RegistrationForm } from '../../types/authorization'
import type { NotificationType } from '../../types/component'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { accountSingUp } from '../../api/user'
import { Button, Form, Input, Modal, notification, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'

export default function RegistrationPage() {
	const [formAccount] = useForm<RegistrationForm>()
	const [api, contextHolder] = notification.useNotification()
	const [isLoading, setLoading] = useState<boolean>(false)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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

	async function handleSubmitForm(values: RegistrationForm) {
		setLoading(true)
		try {
			await accountSingUp({
				login: values.login,
				username: values.username,
				password: values.password,
				email: values.email,
				phoneNumber: values?.phoneNumber,
			})
			openNotificationWithIcon(
				'success',
				'Успешная регистрация',
				'Поздравляю, вы теперь в системе!',
			)
			setIsModalOpen(true)

			formAccount.resetFields()
		} catch (err) {
			throw new Error('Ошибка', err.message)
		}
	}

	function handleSwitchLocation() {
		navigate('/login')
		setIsModalOpen(false)
	}

	return (
		<div className={style.layout}>
			{contextHolder}
			<h1>Регистрация</h1>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
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
										new Error('Логин должен быть написан латинскими буквами'),
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
							{
								validator: (_, value) => {
									const { password } = formAccount.getFieldsValue()
									if (value && value == password) {
										return Promise.resolve()
									}
									return Promise.reject(
										new Error('Пароли должны быть одинаковыми'),
									)
								},
							},
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
						initialValue={'+7'}
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
			)}
			<Modal
				title='Успешная регистрация'
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isModalOpen}
				footer={[
					<Button key='toLogin' type='primary' onClick={handleSwitchLocation}>
						Авторизоваться
					</Button>,
				]}
			>
				<p>
					Поздравляем с успешной регистрацией. Пожалуйста, нажмите на кнопку
					"Авторизоваться", чтобы зайти в аккаунт
				</p>
			</Modal>
		</div>
	)
}
