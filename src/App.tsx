import './App.scss'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import TodoListPage from './pages/TodoListPage/TodoListPage'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import AuthLayout from './components/AuthLayout/AuthLayout'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import MainLayout from './components/MainLayout/MainLayout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
	return (
		<Routes>
			<Route path='/login' element={<AuthLayout children={<LoginPage />} />} />
			<Route
				path='/registration'
				element={<AuthLayout children={<RegistrationPage />} />}
			/>
			<Route
				path='/'
				element={
					<ProtectedRoute
						children={<MainLayout children={<TodoListPage />} />}
					/>
				}
			/>
			<Route
				path='/profile'
				element={
					<ProtectedRoute
						children={<MainLayout children={<ProfilePage />} />}
					/>
				}
			/>
		</Routes>
	)
}

export default App
