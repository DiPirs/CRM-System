import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProfile, refreshToken } from '../api/api'
import { removeUser, setProfile } from '../store/user/Slices/userSlice'
import { selectProfile } from '../modules/user/selectors'
import { tokenManager } from '../store/utils/tokenManager'

export function useAuth() {
	const profile = useSelector(selectProfile)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isInitialized, setIsInitialized] = useState<boolean>(false)

	const restoreTokensFromStorage = useCallback(
		async function restoreTokensFromStorage() {
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
					return true
				} catch (err) {
					console.error('Failed to restore tokens:', err)
					localStorage.removeItem('refreshToken')
					dispatch(removeUser())
					tokenManager.clearTokens()
					return false
				}
			}
			return false
		},
		[dispatch]
	)

	const fetchUserProfile = useCallback(
		async function fetchUserProfile() {
			try {
				const fetchedProfile = await fetchProfile(
					tokenManager.getAccessToken()!
				)
				dispatch(setProfile(fetchedProfile))
			} catch (err) {
				console.error('Failed to fetch profile:', err)
				throw err
			}
		},
		[dispatch]
	)

	const refreshAndSetTokens = useCallback(
		async function refreshAndSetTokens() {
			try {
				const newTokens = await refreshToken(tokenManager.getRefreshToken()!)
				tokenManager.clearTokens()
				tokenManager.setTokens(newTokens)

				localStorage.setItem(
					'refreshToken',
					JSON.stringify(tokenManager.getRefreshToken())
				)
				return true
			} catch (err) {
				localStorage.removeItem('refreshToken')
				dispatch(removeUser())
				tokenManager.clearTokens()
				return false
			}
		},
		[dispatch]
	)

	const initAuth = useCallback(
		async function initAuth() {
			const refreshTokenFromStorage = tokenManager.getRefreshToken()
			const hasTokens = !!refreshTokenFromStorage

			if (!hasTokens) {
				const tokensRestored = await restoreTokensFromStorage()
				if (!tokensRestored) {
					navigate('/login')
					return
				}
			}

			if (!profile) {
				try {
					await fetchUserProfile()
				} catch (err) {
					const tokensRefreshed = await refreshAndSetTokens()
					if (tokensRefreshed) {
						try {
							await fetchUserProfile()
						} catch (finalErr) {
							navigate('/login')
						}
					} else {
						navigate('/login')
					}
				}
			}
		},
		[
			navigate,
			profile,
			fetchUserProfile,
			refreshAndSetTokens,
			restoreTokensFromStorage,
		]
	)

	useEffect(() => {
		async function runInit() {
			await initAuth()
			setIsLoading(false)
			setIsInitialized(true)
		}

		if (!isInitialized) {
			runInit()
		}
	}, [isInitialized, initAuth])

	const isAuthenticated =
		!!profile &&
		!!tokenManager.getRefreshToken() &&
		!!tokenManager.getAccessToken()

	return {
		isAuthenticated,
		profile,
		isLoading,
	}
}
