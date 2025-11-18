import './App.scss'
import { AuthLayout } from './components/AuthLayout/AuthLayout'
import { MainLayout } from './components/MainLayout/MainLayout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProfilePage from './pages/ProfilePage/ProfilePage'
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
					<ProtectedRoute>
						<MainLayout>
							<TodoListPage />
						</MainLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path='/profile'
				element={
					<ProtectedRoute>
						<MainLayout>
							<ProfilePage />
						</MainLayout>
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}

export default App
