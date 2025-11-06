import React from 'react'
import { createTodo } from '../../api/api'
import type { FormInstance } from 'antd'
import { Button, Form, Input, Space } from 'antd'
import { useEffect, useState } from 'react'
import { ClearOutlined, EditOutlined } from '@ant-design/icons'

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

export default React.memo(function TodoForm({ onFetchData }: ITodoForm) {
	const [form] = Form.useForm()

	function handleSubmitTask(): void {
		createTodo({ title: form.getFieldValue(`todoText`) })
			.then(() => onFetchData())
			.then(() => form.setFieldValue('todoText', ''))
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
		>
			<span style={{ fontSize: '18px' }}>Что вы хотели сделать</span>
			<Form.Item
				name='todoText'
				rules={[
					{ required: true, message: 'Поле обязательно для заполнения' },
					{
						min: 2,
						max: 64,
						message: '',
					},
					{
						validator: (_, value) => {
							if (!value || value.trim().length < 2 || value.length > 64) {
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
				style={{ flexGrow: '1' }}
			>
				<Input />
			</Form.Item>
			<Form.Item>
				<Space style={{ display: 'flex', justifyContent: 'center' }}>
					<SubmitButton form={form}>
						<EditOutlined />
						Создать задачу
					</SubmitButton>
					<Button htmlType='reset'>
						<ClearOutlined />
						Очистить поле
					</Button>
				</Space>
			</Form.Item>
		</Form>
	)
})
