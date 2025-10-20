import { useState } from 'react'
import type { TodoInfo } from '../../types/task.types'
import './TaskNavigation.scss'

interface ITaskNavigation {
	tasksFilter: TodoInfo
	getFilter: (fil: string) => void
}

export default function TaskNavigation({
	tasksFilter,
	getFilter,
}: ITaskNavigation) {
	const [isActive, setActive] = useState('all')

	return (
		<nav className='nav__taskList'>
			<button
				id='all'
				className={`nav__button ${isActive === 'all' ? 'active__button' : ''}`}
				onClick={() => {
					setActive('all')
					getFilter('all')
				}}
			>
				Все {tasksFilter.all}
			</button>
			<button
				id='inWork'
				className={`nav__button ${
					isActive === 'inWork' ? 'active__button' : ''
				}`}
				onClick={() => {
					setActive('inWork')
					getFilter('inWork')
				}}
			>
				В прогрессе {tasksFilter.inWork}
			</button>
			<button
				id='completed'
				className={`nav__button ${
					isActive === 'completed' ? 'active__button' : ''
				}`}
				onClick={() => {
					setActive('completed')
					getFilter('completed')
				}}
			>
				Завершенные {tasksFilter.completed}
			</button>
		</nav>
	)
}
