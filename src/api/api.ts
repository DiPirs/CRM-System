import axios, { type AxiosResponse } from 'axios'

import type {
	Todo,
	TodoInfo,
	MetaResponse,
	FilterTodo,
	TodoRequest,
	CreateTodo,
} from '../types/task.types'
import type { AuthData, Token, UserRegistration } from '../types/account.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export async function fetchTodo(
	status: FilterTodo
): Promise<MetaResponse<Todo, TodoInfo>> {
	try {
		const response = await apiClient.get('todos', {
			params: { filter: status },
		})
		return response.data
	} catch (err) {
		throw new Error(
			`Что-то сломалось при получении задач, повторите попытку. ` + err
		)
	}
}

export async function createTodo(createData: CreateTodo) {
	try {
		const response = await apiClient.post('todos', createData)
		return response.data
	} catch (err) {
		throw new Error(
			`Что-то сломалось при создании задачи, повторите попытку. ` + err
		)
	}
}

export async function updateTodo(taskId: number, updateData: TodoRequest) {
	try {
		const response = await apiClient.put(`todos/${taskId}`, updateData)
		return response.data
	} catch (err) {
		throw new Error(
			`Что-то сломалось при изменении задачи, повторите попытку. ` + err
		)
	}
}

export async function deleteTodo(taskId: number): Promise<AxiosResponse> {
	try {
		const response = await apiClient.delete(`todos/${taskId}`)
		return response
	} catch (err) {
		throw new Error(
			`Что-то сломалось при удалении задачи, повторите попытку. ` + err
		)
	}
}

export async function accountSingUp(registrationData: UserRegistration) {
	try {
		const response = await apiClient.post(`/auth/signup`, registrationData)
		return response.data
	} catch (err) {
		if (err.response) {
			if (err.response.status === 400) {
				throw new Error(
					'Ошибка ввода данных. Проверьте правильность заполнения полей.'
				)
			} else if (err.response.status === 409) {
				throw new Error(
					'Пользователь с таким логином и(или) почтой уже создан.'
				)
			} else if (err.response.status === 500) {
				throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
			}
		} else {
			throw new Error('Что-то пошло не так в регистрации: ' + err)
		}
	}
}

export async function accountSignIn(authData: AuthData) {
	try {
		const response = await apiClient.post('/auth/signin', authData)
		return response.data
	} catch (err) {
		if (err.response) {
			if (err.response.status === 400) {
				throw new Error(
					'Ошибка ввода данных. Проверьте правильность заполнения полей.'
				)
			} else if (err.response.status === 401) {
				throw new Error('Неверный логин или пароль.')
			} else if (err.response.status === 500) {
				throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
			} else {
				throw new Error(`Неизвестная ошибка (${err.response.status}).`)
			}
		} else {
			throw new Error('Что-то пошло не так в авторизации: ' + err)
		}
	}
}

export async function fetchProfile(accessToken: string) {
	try {
		const response = await apiClient.get('/user/profile', {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		return response.data
	} catch (err) {
		if (err.response) {
			if (err.response.status === 401) {
				throw new Error('Неавторизованный доступ.')
			} else if (err.response.status === 500) {
				throw new Error('Внутренняя ошибка сервера.')
			} else {
				throw new Error(`Неизвестная ошибка (${err.response.status}).`)
			}
		} else if (err.request) {
			throw new Error('Сервер не отвечает.')
		} else {
			throw new Error('Что-то пошло не так.')
		}
	}
}

export async function accountSignOut(accessToken: string) {
	try {
		const response = await apiClient.post('/user/logout', undefined, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		return response.data
	} catch (err) {
		if (err.response) {
			if (err.response.status === 500) {
				throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
			} else {
				throw new Error(`Неизвестная ошибка (${err.response.status}).`)
			}
		} else {
			throw new Error('Что-то пошло не так при выходе: ' + err)
		}
	}
}

export async function refreshToken(refreshToken: string): Promise<Token> {
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
