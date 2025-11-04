import React from 'react'
import { createTodo } from '../../api/api'
import type { FormInstance } from 'antd'
import { Button, Form, Input, Space } from 'antd'
import { useEffect, useState } from 'react'

interface SubmitButtonProps {
	form: FormInstance
}

interface ITodoForm {
	onFetchData: () => void
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

export default function TodoForm({ onFetchData }: ITodoForm) {
	const [newValue, setNewValue] = useState<string>('')
	const [form] = Form.useForm()

	function handleSubmitTask(): void {
		createTodo({ title: newValue })
			.then(() => onFetchData())
			.then(() => setNewValue(''))
			.catch(err => alert(err))
	}

	return (
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
			onValuesChange={changedValues => {
				setNewValue(changedValues.todoText)
			}}
		>
			<Form.Item
				name='todoText'
				label='Что вы хотели сделать'
				rules={[
					{
						required: true,
						min: 2,
						max: 64,
						message: 'Задача должна быть от 2 до 64 символов',
					},
				]}
				style={{ flexGrow: '1' }}
			>
				<Input />
			</Form.Item>
			<Form.Item>
				<Space style={{ display: 'flex', justifyContent: 'center' }}>
					<SubmitButton form={form}>Submit</SubmitButton>
					<Button htmlType='reset'>Reset</Button>
				</Space>
			</Form.Item>
		</Form>
	)
}
