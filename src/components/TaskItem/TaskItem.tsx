import './TaskItem.scss'
import { useState } from 'react'
import type { Todo } from '../../types/task.types'
import { changeTaskApi, deleteTaskApi, doneTaskApi } from '../../api/api'

interface ITaskItem {
	task: Todo
	onFetchData: (status: string) => void
	setFilterTask: string
	getLoading: (statusLoading: boolean) => void
}

export default function TaskItem({
	task,
	onFetchData,
	setFilterTask,
	getLoading,
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

	function handlerEnterEditMode() {
		setIsEditing(true)
		setSaveInput(inputValue)
	}

	function handlerCancelEdit() {
		setIsEditing(false)
		setInputValue(saveInput)
		setValid(true)
	}

	function handlerAcceptChanges(
		taskId: number,
		newValue: string,
		isDone: boolean
	) {
		if (errorValid) {
			setIsEditing(false)
			changeTaskApi(taskId, newValue, isDone)
				.then(() => getLoading(true))
				.then(() => onFetchData(setFilterTask))
		}
	}

	function handlerDoneTask(taskId: number, value: string) {
		let done = true
		if (isDone == false) {
			done = true
			setDone(true)
		} else {
			done = false
			setDone(false)
		}
		doneTaskApi(taskId, value, done)
			.then(() => getLoading(true))
			.then(() => onFetchData(setFilterTask))
	}

	function handlerDeleteTask(taskId: number) {
		deleteTaskApi(taskId)
			.then(() => getLoading(true))
			.then(() => onFetchData(setFilterTask))
	}

	return (
		<li className='toDoList__item'>
			<input
				name='checkbox'
				type='checkbox'
				className='item__check'
				checked={isDone}
				onChange={() => handlerDoneTask(task.id, inputValue)}
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
						onClick={handlerEnterEditMode}
						id={`item__edit_${task.id}`}
					>
						<img src='/editing.svg' alt='редактировать задачу' />
					</button>
				)}
				{isEditing && (
					<>
						<button
							className='item__button'
							onClick={() => handlerAcceptChanges(task.id, inputValue, isDone)}
							id={`item__accept_${task.id}`}
						>
							<img src='/accept.svg' alt='подтвердить редактирование' />
						</button>
						<button
							className='item__button item__cancel'
							onClick={handlerCancelEdit}
						>
							<img src='/cancel.svg' alt='отменить редактирование' />
						</button>
					</>
				)}
				<button
					className='item__button item__del'
					onClick={() => handlerDeleteTask(task.id)}
				>
					<img src='/delete.svg' alt='удалить задачу' />
				</button>
			</div>
		</li>
	)
}
