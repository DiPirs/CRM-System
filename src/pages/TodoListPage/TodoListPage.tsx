import style from './TodoListPage.module.scss'
import { useCallback, useEffect, useState } from 'react'
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

	const fetchData = useCallback(async (): Promise<void> => {
		setLoading(true)
		fetchTodo(filterTask)
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
	}, [filterTask])

	useEffect(() => {
		fetchData()
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
				<div className={style.toDoNavigation}>
					<TodoNavigation todoFilter={tasksInfo} setFilter={setFilterTask} />
				</div>
				<div className={style.taskList}>
					<TodoList
						tasks={tasks}
						isLoading={isLoading}
						onFetchData={fetchData}
					/>
				</div>
			</div>
		</>
	)
}
