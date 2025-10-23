import './App.scss'
import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'
import type { Todo, TodoInfo, MetaResponse } from './types/task.types'

function App() {
	const [tasks, setTasks] = useState<Todo[]>([])
	const [isLoading, setLoading] = useState(false)
	const [tasksInfo, setTaskInfo] = useState<TodoInfo>({
		all: 0,
		completed: 0,
		inWork: 0,
	})
	const [filterTask, setFilterTask] = useState('all')

	const fetchData = async (status = 'all') => {
		try {
			const response = await fetch(
				`https://easydev.club/api/v1/todos?filter=${status}`
			)
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
		fetchData(filterTask)
	}, [filterTask])

	function submitTask(newValue: string) {
		try {
			const trimValue: string = newValue.trimStart().trimEnd()
			fetch(`https://easydev.club/api/v1/todos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: trimValue,
					isDone: false,
				}),
			})
				.then(() => setLoading(true))
				.then(() => fetchData(filterTask))
		} catch (err) {
			console.error('Error:', err)
		}
	}

	function changeTask(taskId: number, newValue: string, isDone: boolean) {
		try {
			fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: newValue,
					isDone: isDone,
				}),
			})
				.then(() => setLoading(true))
				.then(() => fetchData(filterTask))
		} catch (err) {
			console.error('Error:', err)
		}
	}

	function deleteTask(taskId: number) {
		try {
			fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
				method: 'DELETE',
			})
				.then(() => setLoading(true))
				.then(() => fetchData(filterTask))
		} catch (err) {
			console.error('Error:', err)
		}
	}

	function doneTask(taskId: number, value: string, isDone: boolean) {
		try {
			fetch(`https://easydev.club/api/v1/todos/${taskId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: value,
					isDone: isDone,
				}),
			})
				.then(() => setLoading(true))
				.then(() => fetchData(filterTask))
		} catch (err) {
			console.error('Error:', err)
		}
	}

	return (
		<>
			<div className='form__wrapper'>
				<TaskForm onSubmitTask={submitTask} />
			</div>
			<div className='taskList__wrapper'>
				<TaskList
					tasks={tasks}
					isLoading={isLoading}
					setTasksInfo={tasksInfo}
					setTaskFilter={getFilter => setFilterTask(getFilter)}
					onChangeTask={changeTask}
					onDeleteTask={deleteTask}
					onDoneTask={doneTask}
				/>
			</div>
		</>
	)
}

export default App
