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
	const [inputValue, setInputValue] = useState(task.title)

	function enterEditMode() {
		setIsEditing(true)
	}

	function doneTask() {
		setDone(true)
		onDone(true)
	}

	function acceptChanges() {
		setIsEditing(false)
		onChange(inputValue)
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
				onClick={doneTask}
			/>
			<input
				id={`${task.id}`}
				className={`item__text ${isEditing ? 'active__input' : ''}`}
				type='text'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
			{!isEditing && (
				<button
					className='item__button'
					onClick={enterEditMode}
					id={`item__edit_${task.id}`}
				>
					edi
				</button>
			)}
			{isEditing && (
				<button
					className='item__button'
					onClick={acceptChanges}
					id={`item__accept_${task.id}`}
				>
					accept
				</button>
			)}
			<button className='item__button item__del' onClick={deleteTask}>
				del
			</button>
		</li>
	)
}
