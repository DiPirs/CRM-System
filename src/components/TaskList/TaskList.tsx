import TaskItem from '../TaskItem/TaskItem'
import TaskNavigation from '../TaskNavigation/TaskNavigation'
import './TaskList.scss'
import type { Todo, TodoInfo } from '../../types/task.types'
import { useState } from 'react'

interface ITaskList {
	tasks: Todo[]
	isLoading: boolean
	setTasksInfo: TodoInfo
	onChangeTask: (taskId: number, newValue: string) => void
	onDeleteTask: (taskId: number) => void
	onDoneTask: (taskId: number, value: string, isDone: boolean) => void
}

export default function TaskList({
	tasks,
	isLoading,
	setTasksInfo,
	onChangeTask,
	onDeleteTask,
	onDoneTask,
}: ITaskList) {
	const [filter, setFilter] = useState('all')

	const filteredTasks = tasks.filter(task => {
		if (filter === 'inWork') return task.isDone === false
		if (filter === 'completed') return task.isDone === true
		return true
	})

	return (
		<>
			<h1>Мои задачи</h1>
			<hr />
			<TaskNavigation
				tasksFilter={setTasksInfo}
				getFilter={fil => setFilter(fil)}
			/>
			{isLoading && <span>Loading</span>}
			{!isLoading && (
				<ul className='toDoList'>
					{filteredTasks.map(task => (
						<TaskItem
							key={task.id}
							task={task}
							onChange={newValue => onChangeTask(task.id, newValue)}
							onDelete={taskId => onDeleteTask(taskId)}
							onDone={isDone => onDoneTask(task.id, task.title, isDone)}
						/>
					))}
				</ul>
			)}
		</>
	)
}
