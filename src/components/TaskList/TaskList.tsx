import './TaskList.scss'
import TaskItem from '../TaskItem/TaskItem'
import TaskNavigation from '../TaskNavigation/TaskNavigation'
import type { Todo, TodoInfo } from '../../types/task.types'

interface ITaskList {
	tasks: Todo[]
	isLoading: boolean
	setTasksInfo: TodoInfo
	setTaskFilter: (getFilter: string) => void
	onFetchData: (status: string) => void
	setFilterTask: string
	getLoading: (getLoading: boolean) => void
}

export default function TaskList({
	tasks,
	isLoading,
	setTasksInfo,
	setTaskFilter,
	onFetchData,
	setFilterTask,
	getLoading,
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
							onFetchData={onFetchData}
							setFilterTask={setFilterTask}
							getLoading={statusLoading => getLoading(statusLoading)}
						/>
					))}
				</ul>
			)}
		</>
	)
}
