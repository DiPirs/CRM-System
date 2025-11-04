import style from './TodoListPage.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { FilterTodo, Todo, TodoInfo } from '../../types/task.types'
import { fetchTodo } from '../../api/api'
import { DEFAULT_INFO } from '../../utils/constants'
import TodoForm from '../../components/TodoForm/TodoForm'
import TodoList from '../../components/TodoList/TodoList'
import TodoNavigation from '../../components/TodoNavigation/TodoNavigation'

export default function TodoListPage() {
	const [tasks, setTasks] = useState<Todo[]>([])
	const [isLoading, setLoading] = useState<boolean>(false)
	const [filterTask, setFilterTask] = useState<FilterTodo>('all')
	const [tasksInfo, setTaskInfo] = useState<TodoInfo>(DEFAULT_INFO)
	const filterTaskRef = useRef(filterTask)

	useEffect(() => {
		filterTaskRef.current = filterTask
	}, [filterTask])

	const fetchData = useCallback(
		async (fil?: FilterTodo): Promise<void> => {
			setLoading(true)
			fetchTodo(fil ? fil : filterTask)
				.then(data => {
					setTasks(data.data)
					setTaskInfo(data.info ?? DEFAULT_INFO)
				})
				.catch(err => {
					alert(err)
				})
				.finally(() => {
					setLoading(false)
				})
		},
		[filterTask]
	)

	useEffect(() => {
		fetchData()
	}, [fetchData])

	useEffect(() => {
		const intervalFetch = setInterval(() => {
			fetchData(filterTaskRef.current)
		}, 5000)

		return () => {
			clearInterval(intervalFetch)
		}
	}, [fetchData])

	return (
		<>
			<div className={style.formNewTodo}>
				<TodoForm onFetchData={fetchData} />
			</div>
			<hr className={style.hr} />
			<div className={style.page}>
				<h1 className={style.h1}>Мои задачи</h1>
				<hr className={style.hr} />
				<TodoNavigation todoFilter={tasksInfo} setFilter={setFilterTask} />
				<TodoList tasks={tasks} isLoading={isLoading} onFetchData={fetchData} />
			</div>
		</>
	)
}
