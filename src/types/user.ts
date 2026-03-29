import type { Token } from './authorization'

export interface Profile {
	id: number
	username: string
	email: string
	date: string
	isBlocked: boolean
	roles: Role[]
	phoneNumber: string
}

export interface ProfileRequest {
	username: string
	email: string
	phoneNumber: string
}

export type Role = 'ADMIN' | 'USER' | 'MODERATOR'

export interface UserState {
	token: Token | null
	profile: Profile | null
	isAuthenticated: boolean
}
