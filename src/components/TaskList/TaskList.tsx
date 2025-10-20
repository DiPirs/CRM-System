import TaskItem from '../TaskItem/TaskItem'
import TaskNavigation from '../TaskNavigation/TaskNavigation'
import './TaskList.scss'
import type { Todo, TodoInfo } from '../../types/task.types'

interface ITaskList {
	tasks: Todo[]
	isLoading: boolean
	setTasksInfo: TodoInfo
	onChangeTask: (taskId: number, newValue: string) => void
	onDeleteTask: (taskId: number) => void
}

export default function TaskList({
	tasks,
	isLoading,
	setTasksInfo,
	onChangeTask,
	onDeleteTask,
}: ITaskList) {
	return (
		<>
			<h1>Мои задачи</h1>
			<hr />
			<TaskNavigation tasksFilter={setTasksInfo} />
			{isLoading && <span>Loading</span>}
			{!isLoading && (
				<ul className='toDoList'>
					{tasks.map(task => (
						<TaskItem
							key={task.id}
							task={task}
							onChange={newValue => onChangeTask(task.id, newValue)}
							onDelete={taskId => onDeleteTask(taskId)}
						/>
					))}
				</ul>
			)}
		</>
	)
}
