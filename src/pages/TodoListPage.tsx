import './TodoListPage.scss'
import { useEffect, useState } from 'react'
import TaskForm from '../components/TaskForm/TaskForm'
import TaskList from '../components/TaskList/TaskList'
import type { Todo, TodoInfo } from '../types/task.types'
import { fetchDataApi } from '../api/api'

export default function TodoListPage() {
	const [tasks, setTasks] = useState<Todo[]>([])
	const [isLoading, setLoading] = useState(false)
	const [filterTask, setFilterTask] = useState('all')
	const [tasksInfo, setTaskInfo] = useState<TodoInfo>({
		all: 0,
		completed: 0,
		inWork: 0,
	})

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

	return (
		<>
			<div className='form__wrapper'>
				<TaskForm
					onFetchData={fetchData}
					setFilterTask={filterTask}
					getLoading={statusLoading => setLoading(statusLoading)}
				/>
			</div>
			<div className='taskList__wrapper'>
				<TaskList
					tasks={tasks}
					isLoading={isLoading}
					setTasksInfo={tasksInfo}
					setTaskFilter={getFilter => setFilterTask(getFilter)}
					onFetchData={fetchData}
					setFilterTask={filterTask}
					getLoading={statusLoading => setLoading(statusLoading)}
				/>
			</div>
		</>
	)
}
