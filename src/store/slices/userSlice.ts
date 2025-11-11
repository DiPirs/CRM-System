import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: null,
	nickName: null,
	password: null,
	phoneNumber: null,
	email: null,
	token: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.name = action.payload.name
			state.nickName = action.payload.nickName
			state.password = action.payload.password
			state.phoneNumber = action.payload.phoneNumber
			state.email = action.payload.email
			state.token = action.payload.token
		},
		removeUser(state) {
			state.name = null
			state.nickName = null
			state.password = null
			state.phoneNumber = null
			state.email = null
			state.token = null
		},
	},
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
