import style from './TodoListPage.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { FilterTodo, Todo, TodoInfo } from '../../types/task.types'
import { fetchTodo } from '../../api/api'
import { DEFAULT_INFO } from '../../utils/constants'
import TodoForm from '../../components/TodoForm/TodoForm'
import TodoList from '../../components/TodoList/TodoList'
import TodoNavigation from '../../components/TodoNavigation/TodoNavigation'

interface ITodoListPage {
	setActiveFilter: FilterTodo
	getActiveFilter: (filt: FilterTodo) => void
}

export default function TodoListPage({
	setActiveFilter,
	getActiveFilter,
}: ITodoListPage) {
	const [tasks, setTasks] = useState<Todo[]>([])
	const [isLoading, setLoading] = useState<boolean>(false)
	const [filterTask, setFilterTask] = useState<FilterTodo>(setActiveFilter)
	const [tasksInfo, setTaskInfo] = useState<TodoInfo>(DEFAULT_INFO)
	const [isPaused, setPaused] = useState(false)
	const filterTaskRef = useRef(filterTask)

	useEffect(() => {
		filterTaskRef.current = filterTask
		getActiveFilter(filterTaskRef.current)
	}, [filterTask, getActiveFilter])

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
			if (isPaused) {
				return
			}
			fetchData(filterTaskRef.current)
		}, 5000)

		return () => {
			clearInterval(intervalFetch)
		}
	}, [fetchData, isPaused])

	return (
		<>
			<div className={style.formNewTodo}>
				<TodoForm onFetchData={fetchData} />
			</div>
			<hr className={style.hr} />
			<div className={style.page}>
				<h1 className={style.h1}>Мои задачи</h1>
				<hr className={style.hr} />
				<TodoNavigation
					todoFilter={tasksInfo}
					getFilter={setFilterTask}
					setFilter={setActiveFilter}
				/>
				<TodoList
					tasks={tasks}
					isLoading={isLoading}
					onFetchData={fetchData}
					getPaused={setPaused}
				/>
			</div>
		</>
	)
}
