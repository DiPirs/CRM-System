import { useState } from 'react'
import './App.scss'
import PageMenu from './components/PageMenu/PageMenu'
import AccountPage from './pages/AccountPage/AccountPage'
import TodoListPage from './pages/TodoListPage/TodoListPage'
import { Routes, Route } from 'react-router-dom'
import type { FilterTodo } from './types/task.types'

function App() {
	const [activeFilter, setActiveFilter] = useState<FilterTodo>('all')

	return (
		<div className='layout'>
			<aside className='layout-aside'>
				<PageMenu />
			</aside>
			<main className='layout-content'>
				<Routes>
					<Route
						path='/'
						element={
							<TodoListPage
								setActiveFilter={activeFilter}
								getActiveFilter={setActiveFilter}
							/>
						}
					/>
					<Route path='/profile' element={<AccountPage />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
