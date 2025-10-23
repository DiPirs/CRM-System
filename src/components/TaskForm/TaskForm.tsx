import { useState } from 'react'
import './TaskForm.scss'
import { submitTaskApi } from '../../api/api'

interface ITaskForm {
	onFetchData: (status: string) => void
	setFilterTask: string
	getLoading: (getLoading: boolean) => void
}

export default function TaskForm({
	onFetchData,
	setFilterTask,
	getLoading,
}: ITaskForm) {
	const [newValue, setNewValue] = useState('')
	const [errorValid, setValid] = useState(true)

	function getValidation(value: string) {
		const trimStartValue: string = value.trimStart()
		setNewValue(trimStartValue)
		if (trimStartValue.length < 2 || trimStartValue.length > 64) {
			setValid(false)
		} else {
			setValid(true)
		}
	}

	function handleSubmitTask(newValue: string) {
		const trimValue: string = newValue.trimStart().trimEnd()
		submitTaskApi(trimValue)
			.then(() => getLoading(true))
			.then(() => onFetchData(setFilterTask))
	}

	return (
		<>
			<form
				className='form__createNewTask'
				onSubmit={e => {
					e.preventDefault()
					if (errorValid) {
						handleSubmitTask(newValue)
						setNewValue('')
					}
				}}
			>
				<label className='input__container'>
					<span className='container__description'>
						Что вы хотели сделать{' '}
						{!errorValid && (
							<span className='valid__message'>
								Текст должен быть от 2 до 64 символов и не содержать пробелов в
								начале
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
