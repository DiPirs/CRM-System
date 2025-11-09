import './App.scss'
import PageMenu from './components/PageMenu/PageMenu'
import AccountPage from './pages/AccountPage/AccountPage'
import TodoListPage from './pages/TodoListPage/TodoListPage'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<div className='layout'>
			<aside className='layout-aside'>
				<PageMenu />
			</aside>
			<main className='layout-content'>
				<Routes>
					<Route path='/' element={<TodoListPage />} />
					<Route path='/profile' element={<AccountPage />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
