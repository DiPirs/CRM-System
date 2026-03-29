import { configureStore } from '@reduxjs/toolkit'
import authReducer from './user/slices/userSlice'

export type RootStateStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
})
