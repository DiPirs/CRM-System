import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Profile } from '../../../types/user'
import type { Token } from '../../../types/authorization'
import { initialState } from '../../initialState'

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setProfile(
			state,
			action: PayloadAction<{
				token: Token
				profile: Profile
				isAuthenticated: boolean
			}>,
		) {
			state.token = action.payload.token
			state.profile = action.payload.profile
			state.isAuthenticated = true
		},
		removeProfile(state) {
			state.token = null
			state.profile = null
			state.isAuthenticated = false
		},
	},
})

export const { setProfile, removeProfile } = userSlice.actions
export default userSlice.reducer
