import TaskItem from '../TaskItem/TaskItem'
import TaskNavigation from '../TaskNavigation/TaskNavigation'
import './TaskList.scss'
import type { Todo, TodoInfo } from '../../types/task.types'

interface ITaskList {
	tasks: Todo[]
	isLoading: boolean
	setTasksInfo: TodoInfo
	setTaskFilter: (getFilter: string) => void
	onChangeTask: (taskId: number, newValue: string, isDone: boolean) => void
	onDeleteTask: (taskId: number) => void
	onDoneTask: (taskId: number, value: string, isDone: boolean) => void
}

export default function TaskList({
	tasks,
	isLoading,
	setTasksInfo,
	setTaskFilter,
	onChangeTask,
	onDeleteTask,
	onDoneTask,
}: ITaskList) {
	return (
		<>
			<h1>Мои задачи</h1>
			<hr />
			<TaskNavigation
				tasksFilter={setTasksInfo}
				getFilter={fil => {
					setTaskFilter(fil)
				}}
			/>
			{isLoading && <span>Loading</span>}
			{!isLoading && (
				<ul className='toDoList'>
					{tasks.map(task => (
						<TaskItem
							key={task.id}
							task={task}
							onChange={(newValue, isDone) =>
								onChangeTask(task.id, newValue, isDone)
							}
							onDelete={taskId => onDeleteTask(taskId)}
							onDone={isDone => onDoneTask(task.id, task.title, isDone)}
						/>
					))}
				</ul>
			)}
		</>
	)
}
