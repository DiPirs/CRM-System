import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Profile, Token } from '../../types/account.types'

export interface UserState {
	profile: Profile | null
	tokens: Token | null
}

const initialState: UserState = {
	profile: null,
	tokens: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setTokens(state, action: PayloadAction<Token>) {
			state.tokens = action.payload
		},

		setProfile(state, action: PayloadAction<Profile>) {
			state.profile = action.payload
		},

		removeUser(state) {
			state.profile = null
			state.tokens = null
		},
	},
})

export const { setTokens, setProfile, removeUser } = userSlice.actions

export default userSlice.reducer
