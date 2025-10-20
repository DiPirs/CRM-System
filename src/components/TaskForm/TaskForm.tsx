import { useState } from 'react'
import './TaskForm.scss'

interface ITaskForm {
	onSubmitTask: (newValue: string) => void
}

export default function TaskForm({ onSubmitTask }: ITaskForm) {
	const [newValue, setNewValue] = useState('')

	return (
		<>
			<form
				className='form__createNewTask'
				onSubmit={e => {
					e.preventDefault()
					onSubmitTask(newValue)
					setNewValue('')
				}}
			>
				<label className='input__container'>
					<span className='container__description'>Что вы хотели сделать</span>
					<input
						name='input__task'
						type='text'
						placeholder='Введите задачу...'
						className='container__input'
						value={newValue}
						onChange={e => setNewValue(e.target.value)}
					/>
				</label>
				<button className='form__button button_submitTask'>
					Записать задачу
				</button>
			</form>
		</>
	)
}
