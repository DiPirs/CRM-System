import { useState } from 'react'
import './TaskForm.scss'

export default function TaskForm() {
	const [newValue, setNewValue] = useState('')

	const submitTask = () => {
		try {
			fetch(`https://easydev.club/api/v1/todos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: newValue,
					isDone: false,
				}),
			})
		} catch (err) {
			console.error('Error:', err)
		}
	}

	return (
		<>
			<form
				className='form__createNewTask'
				onSubmit={e => {
					e.preventDefault()
					submitTask()
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
