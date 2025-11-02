import { useState } from 'react'
import type { FilterTodo, TodoInfo } from '../../types/task.types'
import style from './TaskNavigation.module.scss'

interface ITaskNavigation {
	todoFilter: TodoInfo
	setFilter: (fil: FilterTodo) => void
}

export default function TaskNavigation({
	todoFilter,
	setFilter,
}: ITaskNavigation) {
	const [isActive, setActive] = useState('all')

	function switchTodoFilter(typeToDo: FilterTodo): void {
		setActive(`${typeToDo}`)
		setFilter(`${typeToDo}`)
	}

	return (
		<nav className={style.nav__taskList}>
			<button
				id='all'
				className={`${style.nav__button} ${
					isActive === 'all' ? style.active__button : ''
				}`}
				onClick={() => switchTodoFilter('all')}
			>
				Все {todoFilter.all}
			</button>
			<button
				id='inWork'
				className={`${style.nav__button} ${
					isActive === 'inWork' ? `${style.active__button}` : ''
				}`}
				onClick={() => switchTodoFilter('inWork')}
			>
				В прогрессе {todoFilter.inWork}
			</button>
			<button
				id='completed'
				className={`${style.nav__button} ${
					isActive === 'completed' ? `${style.active__button}` : ''
				}`}
				onClick={() => switchTodoFilter('completed')}
			>
				Завершенные {todoFilter.completed}
			</button>
		</nav>
	)
}
