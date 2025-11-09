import { createTodo } from '../../api/api'
import { Button, Form, Input, Space, notification } from 'antd'
import { ClearOutlined, EditOutlined } from '@ant-design/icons'
import validateTodoText from '../../utils/validate'

interface TodoFormProps {
	onFetchData: () => void
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function TodoForm({ onFetchData }: TodoFormProps) {
	const [form] = Form.useForm()
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

	function handleSubmitTask(values: { todoText: string }) {
		const formValue: string = values.todoText
		const isValidate = validateTodoText(formValue.trim())
		if (isValidate) {
			createTodo({ title: formValue.trim() })
				.then(() =>
					openNotificationWithIcon(
						'success',
						'Успех',
						'Задача переведена в новый статус'
					)
				)
				.then(() => onFetchData())
				.then(() => form.setFieldValue('todoText', ''))
				.catch(err =>
					openNotificationWithIcon('error', 'Ошибка создания задачи', err)
				)
		} else {
			form.setFields([
				{
					name: 'todoText',
					errors: ['Задача должна быть от 2 символов (не считая пробелы)'],
				},
			])
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
				onFinish={handleSubmitTask}
			>
				<span style={{ fontSize: '18px' }}>Что вы хотели сделать</span>
				<Form.Item
					name='todoText'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
						{
							whitespace: true,
							message: 'Задача не должна состоять только из пробелов',
						},
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
