import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProfile, refreshToken } from '../api/api'
import { removeUser, setProfile } from '../store/user/Slices/userSlice'
import { selectProfile } from '../modules/user/selectors'
import { tokenManager } from '../store/utils/tokenManager'

export function useAuth() {
	const profile = useSelector(selectProfile)
	const isAuthenticated =
		!!profile &&
		!!tokenManager.getRefreshToken() &&
		!!tokenManager.getAccessToken()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const isChecked = useRef<boolean>(false)

	useEffect(() => {
		isChecked.current = false

		const checkAuth = async () => {
			if (isChecked.current) return
			if (!tokenManager.getRefreshToken()) {
				const tokensStr = localStorage.getItem('refreshToken')
				if (tokensStr) {
					try {
						const localTokens = JSON.parse(tokensStr)
						const newTokens = await refreshToken(localTokens)
						tokenManager.clearTokens()
						tokenManager.setTokens(newTokens)

						localStorage.setItem(
							'refreshToken',
							JSON.stringify(tokenManager.getRefreshToken())
						)

						if (!profile) {
							const fetchedProfile = await fetchProfile(
								tokenManager.getAccessToken()!
							)
							dispatch(setProfile(fetchedProfile))
						}
					} catch (err) {
						console.error(err)
						localStorage.removeItem('refreshToken')
						dispatch(removeUser())
						tokenManager.clearTokens()
						navigate('/login')
					}
				} else {
					navigate('/login')
				}
			} else {
				if (!profile) {
					try {
						const fetchedProfile = await fetchProfile(
							tokenManager.getAccessToken()!
						)
						dispatch(setProfile(fetchedProfile))
					} catch (err) {
						console.error(err)
						try {
							const newTokens = await refreshToken(
								tokenManager.getRefreshToken()!
							)
							tokenManager.clearTokens()
							tokenManager.setTokens(newTokens)

							localStorage.setItem(
								'refreshToken',
								JSON.stringify(tokenManager.getRefreshToken())
							)

							const fetchedProfile = await fetchProfile(
								tokenManager.getAccessToken()!
							)
							dispatch(setProfile(fetchedProfile))
						} catch (refreshErr) {
							console.error(refreshErr)
							localStorage.removeItem('refreshToken')
							dispatch(removeUser())
							tokenManager.clearTokens()
							navigate('/login')
						}
					}
				}
			}
			setIsLoading(false)
		}

		checkAuth()
		return () => {
			isChecked.current = true
		}
	}, [dispatch, navigate, profile])

	return {
		isAuthenticated,
		profile,
		isLoading,
	}
}
