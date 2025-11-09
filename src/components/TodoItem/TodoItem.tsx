import style from './TodoItem.module.scss'
import { useState } from 'react'
import type { Todo } from '../../types/task.types'
import { deleteTodo, updateTodo } from '../../api/api'
import { Checkbox } from 'antd'
import { Button, Form, Input, Space, notification } from 'antd'
import validateTodoText from '../../utils/validate'

interface TodoItemProps {
	task: Todo
	onFetchData: () => void
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function TodoItem({ task, onFetchData }: TodoItemProps) {
	const [isEditing, setIsEditing] = useState<boolean>(false)
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

	function handleEnterEditMode() {
		setIsEditing(true)
	}

	function handleCancelEdit() {
		setIsEditing(false)
		form.resetFields()
	}

	function handleDoneTask() {
		updateTodo(task.id, { isDone: !task.isDone })
			.then(() => onFetchData())
			.catch(err =>
				openNotificationWithIcon(
					'error',
					'Ошибка перевода задачи в новый статус',
					err
				)
			)
	}

	function handleDeleteTask() {
		deleteTodo(task.id)
			.then(() => onFetchData())
			.catch(err =>
				openNotificationWithIcon('error', 'Ошибка удаления задачи', err)
			)
	}

	function handleChangeTodo(values: { todoItemText: string }) {
		const formValue: string = values.todoItemText
		const isValidate = validateTodoText(formValue.trim())
		if (isValidate) {
			updateTodo(task.id, { title: formValue.trim() })
				.then(() => onFetchData())
				.then(() => setIsEditing(false))
				.catch(err =>
					openNotificationWithIcon('error', 'Ошибка изменении задачи', err)
				)
		} else {
			form.setFields([
				{
					name: 'todoItemText',
					errors: ['Задача должна быть от 2 символов (не считая пробелы)'],
				},
			])
		}
	}

	return (
		<>
			{contextHolder}
			<div className={style.toDoList__item}>
				<Checkbox
					name={`isDone-${task.id}-${task.isDone}`}
					onChange={handleDoneTask}
					checked={task.isDone}
				/>
				<Form
					form={form}
					name={`todoItemForm-${task.id}`}
					layout='vertical'
					autoComplete='off'
					style={{
						display: 'flex',
						gap: '10px',
						flexGrow: '2',
					}}
					initialValues={{ todoItemText: `${task.title}` }}
					onFinish={handleChangeTodo}
				>
					<Form.Item
						name='todoItemText'
						rules={[
							{ required: true, message: 'Поле обязательно для заполнения' },
							{ min: 2, message: 'Задача должна быть от 2 символов' },
							{ max: 64, message: 'Задача не должна превышать 64 символа' },
						]}
						style={{ flexGrow: '1', margin: 0 }}
					>
						<Input
							style={{
								border: !isEditing ? 'none' : '1px solid var(--color-white)',
								background: !isEditing ? 'none' : 'var(--color-grey-1)',
								color: task.isDone
									? 'var(--color-grey-someLight)'
									: 'var(--color-white)',
								textDecoration: task.isDone ? 'line-through' : 'none',
							}}
							disabled={!isEditing}
						/>
					</Form.Item>
					<Form.Item
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							margin: 0,
						}}
					>
						<Space>
							{!isEditing && (
								<Button onClick={handleEnterEditMode}>
									<img src='/editing.svg' alt='редактировать задачу' />
								</Button>
							)}
							{isEditing && (
								<>
									<Button type='primary' htmlType='submit'>
										<img src='/accept.svg' alt='подтвердить редактирование' />
									</Button>
									<Button onClick={handleCancelEdit}>
										<img src='/cancel.svg' alt='отменить редактирование' />
									</Button>
								</>
							)}
							<Button
								onClick={handleDeleteTask}
								style={{
									backgroundColor: 'var(--color-red-someDark)',
									border: 'none',
								}}
							>
								<img src='/delete.svg' alt='удалить задачу' />
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}
