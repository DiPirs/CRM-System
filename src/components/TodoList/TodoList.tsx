import type { Todo } from '../../types/task.types'
import TodoItem from '../TodoItem/TodoItem'
import style from './TodoList.module.scss'

interface ITodoList {
	tasks: Todo[]
	isLoading: boolean
	onFetchData: () => void
}

export default function TaskList({ tasks, isLoading, onFetchData }: ITodoList) {
	return (
		<>
			{isLoading && <span>Loading</span>}
			{!isLoading && (
				<ul className={style.toDoList}>
					{tasks.map(task => (
						<TodoItem key={task.id} task={task} onFetchData={onFetchData} />
					))}
				</ul>
			)}
		</>
	)
}
