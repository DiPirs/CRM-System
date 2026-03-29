export interface UserRegistration {
	login: string
	username: string
	password: string
	email: string
	phoneNumber?: string
}

export interface RegistrationForm extends UserRegistration {
	secondPassword: string
}

export interface AuthData {
	login: string
	password: string
}

export interface Token {
	accessToken: string
	refreshToken: string
}
