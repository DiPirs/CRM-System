import { useState } from 'react'
import './TaskItem.scss'
import type { Todo } from '../../types/task.types'

interface ITaskItem {
	task: Todo
	onChange: (newValue: string, isDone: boolean) => void
	onDelete: (taskId: number) => void
	onDone: (isDone: boolean) => void
}

export default function TaskItem({
	task,
	onChange,
	onDelete,
	onDone,
}: ITaskItem) {
	const [isEditing, setIsEditing] = useState(false)
	const [isDone, setDone] = useState(task.isDone)
	const [inputValue, setInputValue] = useState(task.title)
	const [errorValid, setValid] = useState(true)
	const [saveInput, setSaveInput] = useState('')

	function getValidation(value: string) {
		const trimStartValue: string = value.trimStart()
		setInputValue(trimStartValue)
		if (trimStartValue.length < 2 || trimStartValue.length > 64) {
			setValid(false)
		} else {
			setValid(true)
		}
	}

	function enterEditMode() {
		setIsEditing(true)
		setSaveInput(inputValue)
	}

	function doneTask() {
		setDone(!isDone)
		onDone(!isDone)
	}

	function acceptChanges() {
		if (errorValid) {
			setIsEditing(false)
			onChange(inputValue, isDone)
		}
	}

	function cancelEdit() {
		setIsEditing(false)
		setInputValue(saveInput)
		setValid(true)
	}

	function deleteTask() {
		onDelete(task.id)
	}

	return (
		<li className='toDoList__item'>
			<input
				name='checkbox'
				type='checkbox'
				className='item__check'
				checked={isDone}
				onChange={doneTask}
			/>
			<div className='item__text-container'>
				{!errorValid && (
					<span className='valid__message'>
						Текст должен быть от 2 до 64 символов и не содержать пробелов в
						начале
					</span>
				)}
				<input
					id={`${task.id}`}
					className={`item__text ${isEditing ? 'active__input' : ''} ${
						isDone ? 'done__task' : ''
					} ${!errorValid ? 'error__valid' : ''}`}
					type='text'
					value={inputValue}
					onChange={e => getValidation(e.target.value)}
				/>
			</div>

			<div className='item__buttons'>
				{!isEditing && (
					<button
						className='item__button'
						onClick={enterEditMode}
						id={`item__edit_${task.id}`}
					>
						<img src='/editing.svg' alt='редактировать задачу' />
					</button>
				)}
				{isEditing && (
					<>
						<button
							className='item__button'
							onClick={acceptChanges}
							id={`item__accept_${task.id}`}
						>
							<img src='/accept.svg' alt='подтвердить редактирование' />
						</button>
						<button className='item__button item__cancel' onClick={cancelEdit}>
							<img src='/cancel.svg' alt='отменить редактирование' />
						</button>
					</>
				)}
				<button className='item__button item__del' onClick={deleteTask}>
					<img src='/delete.svg' alt='удалить задачу' />
				</button>
			</div>
		</li>
	)
}
