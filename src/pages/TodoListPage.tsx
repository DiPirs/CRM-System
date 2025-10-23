import './TodoListPage.scss'
import { useEffect, useState } from 'react'
import TaskForm from '../components/TaskForm/TaskForm'
import TaskList from '../components/TaskList/TaskList'
import type { Todo, TodoInfo } from '../types/task.types'
import {
	changeTaskApi,
	deleteTaskApi,
	doneTaskApi,
	fetchDataApi,
	submitTaskApi,
} from '../api/api'

export default function TodoListPage() {
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
			const data = await fetchDataApi(status)
			if (!data) {
				throw new Error('No data received from API')
			}
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
		const trimValue: string = newValue.trimStart().trimEnd()
		submitTaskApi(trimValue)
			.then(() => setLoading(true))
			.then(() => fetchData(filterTask))
	}

	function changeTask(taskId: number, newValue: string, isDone: boolean) {
		changeTaskApi(taskId, newValue, isDone)
			.then(() => setLoading(true))
			.then(() => fetchData(filterTask))
	}

	function deleteTask(taskId: number) {
		deleteTaskApi(taskId)
			.then(() => setLoading(true))
			.then(() => fetchData(filterTask))
	}

	function doneTask(taskId: number, value: string, isDone: boolean) {
		doneTaskApi(taskId, value, isDone)
			.then(() => setLoading(true))
			.then(() => fetchData(filterTask))
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
