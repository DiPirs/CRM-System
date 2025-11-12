import style from './TodoListPage.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { FilterTodo, Todo, TodoInfo } from '../../types/task.types'
import { fetchTodo } from '../../api/api'
import {
	DEFAULT_INFO,
	AUTO_REFRESH_TODO_INTERVAL_MS,
} from '../../utils/constants'
import TodoForm from '../../components/TodoForm/TodoForm'
import TodoList from '../../components/TodoList/TodoList'
import TodoNavigation from '../../components/TodoNavigation/TodoNavigation'
import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default function TodoListPage() {
	const [tasks, setTasks] = useState<Todo[]>([])
	const [isLoading, setLoading] = useState<boolean>(false)
	const [filterTask, setFilterTask] = useState<FilterTodo>('all')
	const [tasksInfo, setTaskInfo] = useState<TodoInfo>(DEFAULT_INFO)
	const filterTaskRef = useRef(filterTask)

	const [api, contextHolder] = notification.useNotification()

	const openNotificationWithIcon = (
		type: NotificationType,
		title: string,
		description: string
	) => {
		api[type]({
			message: `${title}`,
			description: `${description}`,
		})
	}

	useEffect(() => {
		filterTaskRef.current = filterTask
	}, [filterTask])

	const fetchData = useCallback(
		async (fil?: FilterTodo): Promise<void> => {
			setLoading(true)
			try {
				const data = await fetchTodo(fil ? fil : filterTask)
				setTasks(data.data)
				setTaskInfo(data.info ?? DEFAULT_INFO)
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err)
				openNotificationWithIcon('error', 'Ошибка загрузки данных', message)
			} finally {
				setLoading(false)
			}
		},
		[filterTask]
	)

	useEffect(() => {
		fetchData()
	}, [fetchData])

	useEffect(() => {
		const intervalFetch = setInterval(() => {
			fetchData(filterTaskRef.current)
		}, AUTO_REFRESH_TODO_INTERVAL_MS)

		return () => {
			clearInterval(intervalFetch)
		}
	}, [fetchData])

	return (
		<>
			{contextHolder}
			<div className={style.formNewTodo}>
				<TodoForm onFetchData={fetchData} />
			</div>
			<hr className={style.hr} />
			<div className={style.page}>
				<h1 className={style.h1}>Мои задачи</h1>
				<hr className={style.hr} />
				<TodoNavigation todoFilter={tasksInfo} getFilter={setFilterTask} />
				<TodoList tasks={tasks} isLoading={isLoading} onFetchData={fetchData} />
			</div>
		</>
	)
}
