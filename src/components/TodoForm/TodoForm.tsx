import { createTodo } from '../../api/api'
import { Button, Form, Input, Space, notification } from 'antd'
import { ClearOutlined, EditOutlined } from '@ant-design/icons'

interface TodoFormProps {
	onFetchData: () => void
}

interface TodoFormValues {
	todoText: string
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function TodoForm({ onFetchData }: TodoFormProps) {
	const [form] = Form.useForm<TodoFormValues>()
	const [api, contextHolder] = notification.useNotification()

	const openNotificationWithIcon = (
		type: NotificationType,
		title: string,
		description: string
	) => {
		api[type]({
			message: `${title}`,
			description: `${description}`,
		})
	}

	async function handleSubmitNewTodo(values: TodoFormValues) {
		try {
			const formValue: string = values.todoText
			await createTodo({ title: formValue.trim() })

			openNotificationWithIcon(
				'success',
				'Успех',
				'Задача переведена в новый статус'
			)

			onFetchData()
			form.resetFields()
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err)
			openNotificationWithIcon('error', 'Ошибка создания задачи', message)
		}
	}

	return (
		<>
			{contextHolder}
			<Form
				form={form}
				name='validateOnly'
				layout='vertical'
				autoComplete='off'
				style={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: '2',
				}}
				onFinish={handleSubmitNewTodo}
			>
				<span style={{ fontSize: '18px' }}>Что вы хотели сделать</span>
				<Form.Item
					name='todoText'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
						{ min: 2, message: 'Задача должна быть от 2 символов' },
						{ max: 64, message: 'Задача не должна превышать 64 символа' },
					]}
					style={{ flexGrow: '1' }}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Space style={{ display: 'flex', justifyContent: 'center' }}>
						<Button type='primary' htmlType='submit'>
							<EditOutlined />
							Создать задачу
						</Button>
						<Button htmlType='reset'>
							<ClearOutlined />
							Очистить поле
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	)
}
