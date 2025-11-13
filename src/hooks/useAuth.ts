import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProfile, refreshToken } from '../api/api'
import {
	removeUser,
	setProfile,
	setTokens,
	type UserState,
} from '../store/slices/userSlice'
import type { RootState } from '../store/store'

export function useAuth() {
	const { profile, tokens } = useSelector<RootState, UserState>(
		state => state.user
	)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const isChecked = useRef<boolean>(false)

	useEffect(() => {
		isChecked.current = false

		const checkAuth = async () => {
			if (isChecked.current) return
			if (!tokens?.refreshToken) {
				const tokensStr = localStorage.getItem('tokens')
				if (tokensStr) {
					try {
						const localTokens = JSON.parse(tokensStr)
						const newTokens = await refreshToken(localTokens)
						localStorage.setItem(
							'tokens',
							JSON.stringify(newTokens.refreshToken)
						)
						dispatch(setTokens(newTokens))

						if (!profile) {
							const fetchedProfile = await fetchProfile(newTokens.accessToken)
							dispatch(setProfile(fetchedProfile))
						}
					} catch (err) {
						console.error(err)
						localStorage.removeItem('tokens')
						dispatch(removeUser())
						navigate('/login')
					}
				} else {
					navigate('/login')
				}
			} else {
				if (!profile) {
					try {
						const fetchedProfile = await fetchProfile(tokens.accessToken)
						dispatch(setProfile(fetchedProfile))
					} catch (err) {
						console.error(err)
						try {
							const newTokens = await refreshToken(tokens.refreshToken)
							localStorage.setItem(
								'tokens',
								JSON.stringify(newTokens.refreshToken)
							)
							dispatch(setTokens(newTokens))

							const fetchedProfile = await fetchProfile(newTokens.accessToken)
							dispatch(setProfile(fetchedProfile))
						} catch (refreshErr) {
							console.error(refreshErr)
							localStorage.removeItem('tokens')
							dispatch(removeUser())
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
	}, [dispatch, navigate, tokens?.refreshToken, profile, tokens?.accessToken])

	const isAuthenticated = !!profile && !!tokens

	return {
		isAuthenticated,
		profile,
		tokens,
		isLoading,
	}
}
