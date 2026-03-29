import axios from 'axios'
import type { AuthData, Token, UserRegistration } from '../types/authorization'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const fetchProfile = async (accessToken: string) => {
	try {
		const response = await apiClient.get('/user/profile', {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		return response.data
	} catch (err) {
		throw new Error('Что-то пошло не так при запросе профиля: ' + err)
	}
}

export const refreshToken = async (refreshToken: string) => {
	try {
		const response = await apiClient.post<Token>('/auth/refresh', {
			refreshToken,
		})
		return response.data
	} catch (err) {
		if (err.response?.status === 401) {
			throw new Error('Нужно авторизироваться заново')
		}
		throw new Error('Что-то пошло не так при проверке токена: ' + err)
	}
}

export const accountSingUp = async (registrationData: UserRegistration) => {
	try {
		const response = await apiClient.post('/auth/signup', registrationData)
		return response.data
	} catch (err) {
		throw new Error(
			'Ошибка ввода данных. Проверьте правильность заполнения полей.',
		)
	}
}

export const accountSingIn = async (authData: AuthData) => {
	try {
		const response = await apiClient.post('/auth/signin', authData)
		return response.data
	} catch (err) {
		throw new Error(
			'Ошибка ввода данных. Проверьте правильность заполнения полей.',
		)
	}
}

export const accountSingOut = async (accessToken: string) => {
	try {
		const response = await apiClient.post('/user/logout', undefined, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		return response.data
	} catch (err) {
		throw new Error('Что-то пошло не так при выходе с аккаунта: ' + err)
	}
}
