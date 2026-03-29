import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import type { ChildrenProps } from '../../types/component'
import type { RootStateStore } from '../../store/store'
import type { UserState } from '../../types/user'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { fetchProfile, refreshToken } from '../../api/user'
import { removeProfile, setProfile } from '../../store/user/slices/userSlice'

export default function ProtectedRoute({ children }: ChildrenProps) {
	const [isLoading, setLoading] = useState<boolean>(true)
	const auth: UserState = useSelector<RootStateStore>(state => state.auth)
	const isAuthenticated = auth?.isAuthenticated
	const dispatch = useDispatch()
	const location = useLocation()
	const navigation = useNavigate()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const tokensStr = localStorage.getItem('refreshToken')
				if (tokensStr) {
					const tokenResponse = await refreshToken(JSON.parse(tokensStr))
					localStorage.setItem(
						'refreshToken',
						JSON.stringify(tokenResponse.refreshToken),
					)
					const profile = await fetchProfile(tokenResponse.accessToken)
					dispatch(
						setProfile({
							token: tokenResponse,
							profile: profile,
							isAuthenticated: true,
						}),
					)
				} else {
					dispatch(removeProfile())
					localStorage.removeItem('refreshToken')
					navigation('/login')
				}
			} catch (err) {
				dispatch(removeProfile())
				localStorage.removeItem('refreshToken')
				navigation('/login')
			} finally {
				setLoading(false)
			}
		}

		checkAuth()
	}, [dispatch, navigation])

	if (isLoading) {
		return <LoadingSpinner />
	}

	if (!isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} replace />
	}

	return <>{children}</>
}
