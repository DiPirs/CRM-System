import { useEffect, useState } from 'react'
import type { Todo } from '../../types/task.types'
import { deleteTodo, updateTodo } from '../../api/api'
import style from './TodoItem.module.scss'
import { Checkbox } from 'antd'
import type { FormInstance } from 'antd'
import { Button, Form, Input, Space } from 'antd'

interface ITodoItem {
	task: Todo
	onFetchData: () => void
}

interface TodoFormValues {
	todoItemText?: string
}

export default function TodoItem({ task, onFetchData }: ITodoItem) {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [form] = Form.useForm()

	function handlerEnterEditMode(): void {
		setIsEditing(true)
	}

	function handlerCancelEdit(): void {
		setIsEditing(false)
		form.resetFields()
	}

	function handlerDoneTask(): void {
		updateTodo(task.id, { isDone: !task.isDone })
			.then(() => onFetchData())
			.catch(err => alert(err))
	}

	function handlerDeleteTask(): void {
		deleteTodo(task.id)
			.then(() => onFetchData())
			.catch(err => alert(err))
	}

	function handlerChangeTodo(values: TodoFormValues): void {
		updateTodo(task.id, { title: values.todoItemText?.trim() })
			.then(() => onFetchData())
			.then(() => setIsEditing(false))
			.catch(err => alert(err))
	}

	interface SubmitButtonProps {
		form: FormInstance
	}

	const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
		form,
		children,
	}) => {
		const [submittable, setSubmittable] = useState<boolean>(false)

		const values = Form.useWatch([], form)

		useEffect(() => {
			form
				.validateFields({ validateOnly: true })
				.then(() => setSubmittable(true))
				.catch(() => setSubmittable(false))
		}, [form, values])

		return (
			<Button type='primary' htmlType='submit' disabled={!submittable}>
				{children}
			</Button>
		)
	}

	return (
		<div className={style.toDoList__item}>
			<Checkbox onChange={handlerDoneTask} checked={task.isDone} />
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
				onFinish={handlerChangeTodo}
			>
				<Form.Item
					name='todoItemText'
					rules={[
						{ required: true, message: 'Поле обязательно для заполнения' },
						{
							validator: (_, value) => {
								if (!value || value.trim().length < 2) {
									return Promise.reject(
										new Error(
											'Задача должна быть от 2 (без учета пробелов) до 64 символов'
										)
									)
								}
								return Promise.resolve()
							},
						},
					]}
					style={{ flexGrow: '1', margin: 0 }}
				>
					{!isEditing && (
						<Input
							style={{
								pointerEvents: 'none',
								border: 'none',
								background: 'none',
								color: 'var(--color-white)',
							}}
						/>
					)}
					{isEditing && (
						<Input
							style={{
								border: '1px solid var(--color-white)',
								backgroundColor: 'var(--color-grey-1)',
								color: 'var(--color-white)',
							}}
						/>
					)}
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
							<Button onClick={handlerEnterEditMode}>
								<img src='/editing.svg' alt='редактировать задачу' />
							</Button>
						)}
						{isEditing && (
							<>
								<SubmitButton form={form}>
									<img src='/accept.svg' alt='подтвердить редактирование' />
								</SubmitButton>
								<Button onClick={handlerCancelEdit}>
									<img src='/cancel.svg' alt='отменить редактирование' />
								</Button>
							</>
						)}
						<Button
							onClick={handlerDeleteTask}
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
	)
}
