import { useAuth } from '../../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from '../Loading/Loading'

interface ProtectedRouteProps {
	children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated, isLoading } = useAuth()
	const location = useLocation()

	if (isLoading) {
		return <Loading />
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return <>{children}</>
}
