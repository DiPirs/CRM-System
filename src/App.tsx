import { Layout } from 'antd'
import './App.scss'
import PageMenu from './components/PageMenu/PageMenu'
import AccountPage from './pages/AccountPage/AccountPage'
import TodoListPage from './pages/TodoListPage/TodoListPage'
import { Routes, Route } from 'react-router-dom'
import Sider from 'antd/es/layout/Sider'

function App() {
	return (
		<Layout>
			<Sider style={{ maxHeight: '100vh' }}>
				<PageMenu />
			</Sider>
			<Layout>
				<main className='layout-content'>
					<Routes>
						<Route path='/' element={<TodoListPage />} />
						<Route path='/profile' element={<AccountPage />} />
					</Routes>
				</main>
			</Layout>
		</Layout>
	)
}

export default App
