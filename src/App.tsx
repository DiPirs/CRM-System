import './App.scss'
import { AuthLayout } from './components/AuthLayout/AuthLayout'
import { MainLayout } from './components/MainLayout/MainLayout'
import AccountPage from './pages/AccountPage/AccountPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import TodoListPage from './pages/TodoListPage/TodoListPage'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<Routes>
			<Route
				path='/login'
				element={
					<AuthLayout>
						<LoginPage />
					</AuthLayout>
				}
			/>
			<Route
				path='/registration'
				element={
					<AuthLayout>
						<RegistrationPage />
					</AuthLayout>
				}
			/>
			<Route
				path='/'
				element={
					<MainLayout>
						<TodoListPage />
					</MainLayout>
				}
			/>
			<Route
				path='/profile'
				element={
					<MainLayout>
						<AccountPage />
					</MainLayout>
				}
			/>
		</Routes>
	)
}

export default App
