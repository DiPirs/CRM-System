import TaskItem from '../TaskItem/TaskItem'
import type { Todo } from '../../types/task.types'
import style from './TaskList.module.scss'

interface ITaskList {
	tasks: Todo[]
	isLoading: boolean
	onFetchData: () => void
}

export default function TaskList({ tasks, isLoading, onFetchData }: ITaskList) {
	return (
		<>
			{isLoading && <span>Loading</span>}
			{!isLoading && (
				<ul className={style.toDoList}>
					{tasks.map(task => (
						<TaskItem key={task.id} task={task} onFetchData={onFetchData} />
					))}
				</ul>
			)}
		</>
	)
}
