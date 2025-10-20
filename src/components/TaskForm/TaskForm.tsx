import { useState } from 'react'
import './TaskForm.scss'

interface ITaskForm {
	onSubmitTask: (newValue: string) => void
}

export default function TaskForm({ onSubmitTask }: ITaskForm) {
	const [newValue, setNewValue] = useState('')
	const [errorValid, setValid] = useState(true)

	function getValidation(value: string) {
		setNewValue(value)
		if (value.length < 2 || value.length > 64) {
			setValid(false)
		} else {
			setValid(true)
		}
	}
	return (
		<>
			<form
				className='form__createNewTask'
				onSubmit={e => {
					e.preventDefault()
					if (errorValid) {
						onSubmitTask(newValue)
						setNewValue('')
					}
				}}
			>
				<label className='input__container'>
					<span className='container__description'>
						Что вы хотели сделать{' '}
						{!errorValid && (
							<span className='valid__message'>
								Текст должен быть от 2 до 64 символов
							</span>
						)}
					</span>
					<input
						name='input__task'
						type='text'
						placeholder='Введите задачу...'
						className='container__input'
						value={newValue}
						onChange={e => getValidation(e.target.value)}
						required
					/>
				</label>
				<button className='form__button button_submitTask'>Добавить</button>
			</form>
		</>
	)
}
