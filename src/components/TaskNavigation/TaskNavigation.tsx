import { useState } from 'react'
import type { TodoInfo } from '../../types/task.types'
import './TaskNavigation.scss'

interface ITaskNavigation {
	tasksFilter: TodoInfo
}

export default function TaskNavigation({ tasksFilter }: ITaskNavigation) {
	const [isActive, setActive] = useState('all')

	return (
		<nav className='nav__taskList'>
			<button
				id='all'
				className={`nav__button ${isActive === 'all' ? 'active__button' : ''}`}
				onClick={() => setActive('all')}
			>
				Все задачи {tasksFilter.all}
			</button>
			<button
				id='inWork'
				className={`nav__button ${
					isActive === 'inWork' ? 'active__button' : ''
				}`}
				onClick={() => setActive('inWork')}
			>
				Активные {tasksFilter.inWork}
			</button>
			<button
				id='completed'
				className={`nav__button ${
					isActive === 'completed' ? 'active__button' : ''
				}`}
				onClick={() => setActive('completed')}
			>
				Законченные {tasksFilter.completed}
			</button>
		</nav>
	)
}
