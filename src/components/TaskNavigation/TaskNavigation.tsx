import type { TodoInfo } from '../../types/task.types'
import './TaskNavigation.scss'

interface ITaskNavigation {
	tasksFilter: TodoInfo
}

export default function TaskNavigation({ tasksFilter }: ITaskNavigation) {
	return (
		<nav className='nav__taskList'>
			<button className={`nav__button`}>Все задачи {tasksFilter.all}</button>
			<button className={`nav__button`}>Активные {tasksFilter.inWork}</button>
			<button className={`nav__button`}>
				Законченные {tasksFilter.completed}
			</button>
		</nav>
	)
}
