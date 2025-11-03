import React, { useState } from 'react'
import { createTodo } from '../../api/api'
import validateTodoText from '../../utils/validate'
import style from './TodoForm.module.scss'

interface ITodoForm {
	onFetchData: () => void
}

export default function TodoForm({ onFetchData }: ITodoForm) {
	const [newValue, setNewValue] = useState<string>('')
	const [approveValid, setValid] = useState<boolean>(true)

	function handleSubmitTask(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault()
		const trimValue: string = newValue.trim()
		const validStatus: boolean = validateTodoText(trimValue)
		setValid(validStatus)
		if (validStatus) {
			createTodo({ title: trimValue })
				.then(() => onFetchData())
				.then(() => setNewValue(''))
				.catch(err => alert(err))
		}
	}

	return (
		<form
			className={style.form__createNewTask}
			onSubmit={e => handleSubmitTask(e)}
		>
			<label className={style.input__container}>
				<span className={style.container__description}>
					Что вы хотели сделать{' '}
					{!approveValid && (
						<span className={style.valid__message}>
							Текст должен быть от 2 до 64 символов и не содержать пробелов в
							начале
						</span>
					)}
				</span>
				<input
					name='input__task'
					type='text'
					placeholder='Введите задачу...'
					className={style.container__input}
					value={newValue}
					onChange={e => setNewValue(e.target.value)}
					required
				/>
			</label>
			<button className={`${style.form__button} ${style.button_submitTask}`}>
				Добавить
			</button>
		</form>
	)
}
