import { useEffect, useState } from 'react'
import TaskItem from '../TaskItem/TaskItem'
import TaskNavigation from '../TaskNavigation/TaskNavigation'
import './TaskList.scss'
import type { Todo, TodoInfo, MetaResponse } from '../../types/task.types'

export default function TaskList() {
	const [tasks, setTasks] = useState<Todo[]>([])
	const [isLoading, setLoading] = useState(false)
	const [tasksInfo, setTaskInfo] = useState<TodoInfo>({
		all: 0,
		completed: 0,
		inWork: 0,
	})

	const fetchData = async () => {
		try {
			const response = await fetch('https://easydev.club/api/v1/todos')
			const data: MetaResponse<Todo, TodoInfo> = await response.json()
			setTasks(data.data)
			setTaskInfo(data.info ?? { all: 0, completed: 0, inWork: 0 })
			setLoading(false)
		} catch (err) {
			console.error('Error:', err)
		}
	}
	useEffect(() => {
		setLoading(true)
		fetchData()
	}, [])

	function changeTask(taskId: number, newValue: string) {
		try {
			fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: newValue,
					isDone: false,
				}),
			})
			fetchData()
		} catch (err) {
			console.error('Error:', err)
		}
	}

	function deleteTask(taskId: number) {
		try {
			fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
				method: 'DELETE',
			})
			fetchData()
		} catch (err) {
			console.error('Error:', err)
		}
	}

	return (
		<>
			<h1>Мои задачи</h1>
			<hr />
			<TaskNavigation tasksFilter={tasksInfo} />
			{isLoading && <span>Loading</span>}
			{!isLoading && (
				<ul className='toDoList'>
					{tasks.map(task => (
						<TaskItem
							key={task.id}
							task={task}
							onChange={newValue => changeTask(task.id, newValue)}
							onDelete={taskId => deleteTask(taskId)}
						/>
					))}
				</ul>
			)}
		</>
	)
}
