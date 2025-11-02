import { useState } from 'react'
import type { Todo } from '../../types/task.types'
import { deleteTodo, updateTodo } from '../../api/api'
import validateTodoText from '../../utils/validate'
import style from './TaskItem.module.scss'

interface ITaskItem {
	task: Todo
	onFetchData: () => void
}

export default function TaskItem({ task, onFetchData }: ITaskItem) {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>(task.title)
	const [approveValid, setValid] = useState<boolean>(true)
	const [saveInput, setSaveInput] = useState<string>('')

	function handlerEnterEditMode(): void {
		setIsEditing(true)
		setSaveInput(inputValue)
	}

	function handlerCancelEdit(): void {
		setIsEditing(false)
		setInputValue(saveInput)
		setValid(true)
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

	function handlerChangeTodo(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault()
		const trimValue: string = inputValue.trim()
		const validStatus: boolean = validateTodoText(trimValue)
		setValid(validStatus)
		if (validStatus) {
			updateTodo(task.id, { title: trimValue })
				.then(() => onFetchData())
				.catch(err => alert(err))
		}
	}

	return (
		<li className={style.toDoList__item}>
			<input
				name='checkbox'
				type='checkbox'
				className={style.item__check}
				checked={task.isDone}
				onChange={handlerDoneTask}
			/>
			<form className={style.toDoItemText} onSubmit={handlerChangeTodo}>
				<div className={style.item__text_container}>
					{!approveValid && (
						<span className={style.valid__message}>
							Текст должен быть от 2 до 64 символов и не содержать пробелов в
							начале
						</span>
					)}
					<input
						id={`${task.id}`}
						className={`${style.item__text} ${
							isEditing ? `${style.active__input}` : ''
						} ${task.isDone ? `${style.done__task}` : ''} ${
							!approveValid ? `${style.error__valid}` : ''
						}`}
						type='text'
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
				</div>
				{!isEditing && (
					<button
						className={style.item__button}
						onClick={handlerEnterEditMode}
						id={`item__edit_${task.id}`}
					>
						<img src='/editing.svg' alt='редактировать задачу' />
					</button>
				)}
				{isEditing && (
					<>
						<button
							className={style.item__button}
							id={`item__accept_${task.id}`}
						>
							<img src='/accept.svg' alt='подтвердить редактирование' />
						</button>
						<button
							className={`${style.item__button} ${style.item__cancel}`}
							onClick={handlerCancelEdit}
						>
							<img src='/cancel.svg' alt='отменить редактирование' />
						</button>
					</>
				)}
			</form>

			<button
				className={`${style.item__button} ${style.item__del}`}
				id={`item__delete_${task.id}`}
				onClick={handlerDeleteTask}
			>
				<img src='/delete.svg' alt='удалить задачу' />
			</button>
		</li>
	)
}
