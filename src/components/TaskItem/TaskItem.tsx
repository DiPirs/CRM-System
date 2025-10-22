import { useState } from 'react'
import './TaskItem.scss'
import type { ITaskItem } from '../../types/task.types'

export default function TaskItem({
	task,
	onChange,
	onDelete,
	onDone,
}: ITaskItem) {
	const [isEditing, setIsEditing] = useState(false)
	const [isDone, setDone] = useState(task.isDone)

	const validTitle = () => {
		if (task.title.length > 64) {
			return task.title.slice(0, 64)
		} else {
			return task.title
		}
	}
	const [inputValue, setInputValue] = useState(validTitle())

	function enterEditMode() {
		setIsEditing(true)
	}

	function doneTask() {
		setDone(!isDone)
		onDone(!isDone)
	}

	function acceptChanges() {
		setIsEditing(false)
		onChange(inputValue)
	}

	function cancelEdit() {
		setIsEditing(false)
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
			<input
				id={`${task.id}`}
				className={`item__text ${isEditing ? 'active__input' : ''} ${
					isDone ? 'done__task' : ''
				}`}
				type='text'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>

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
