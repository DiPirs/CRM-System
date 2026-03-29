import type { UserState } from '../types/user'

export const initialState: UserState = {
	token: null,
	profile: null,
	isAuthenticated: false,
}
