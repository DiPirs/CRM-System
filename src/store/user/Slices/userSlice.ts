import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Profile } from '../../../types/account.types'
import { initialState } from '../../initialState'

export interface UserState {
	profile: Profile | null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setProfile(state, action: PayloadAction<Profile>) {
			state.profile = action.payload
		},
		removeUser(state) {
			state.profile = null
		},
	},
})

export const { setProfile, removeUser } = userSlice.actions

export default userSlice.reducer
