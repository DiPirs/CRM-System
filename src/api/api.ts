import axios from 'axios'

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

export const fetchTodo = async (
	status: FilterTodo
): Promise<MetaResponse<Todo, TodoInfo>> => {
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

export const createTodo = async (createData: CreateTodo) => {
	try {
		const response = await apiClient.post('todos', createData)
		return response.data
	} catch (err) {
		throw new Error(
			`Что-то сломалось при создании задачи, повторите попытку. ` + err
		)
	}
}

export const updateTodo = async (taskId: number, updateData: TodoRequest) => {
	try {
		const response = await apiClient.put(`todos/${taskId}`, updateData)
		return response.data
	} catch (err) {
		throw new Error(
			`Что-то сломалось при изменении задачи, повторите попытку. ` + err
		)
	}
}

export const deleteTodo = async (taskId: number): Promise<Response> => {
	try {
		const response = await apiClient.delete(`todos/${taskId}`)
		return response.data
	} catch (err) {
		throw new Error(
			`Что-то сломалось при удалении задачи, повторите попытку. ` + err
		)
	}
}

export const accountSingUp = async (registrationData: UserRegistration) => {
	try {
		const response = await apiClient.post(`/auth/signup`, registrationData)
		if (response.status === 201) {
			return response.data
		}
	} catch (err: any) {
		if (err.response) {
			if (err.response.status === 400) {
				throw new Error(
					'Ошибка ввода данных. Проверьте правильность заполнения полей.'
				)
			} else if (err.response.status === 409) {
				throw new Error('Пользователь с такими данными уже существует.')
			} else if (err.response.status === 500) {
				throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
			}
		} else {
			throw new Error('Что-то пошло не так в регистрации: ' + err.message)
		}
	}
}

export const accountSignIn = async (authData: AuthData) => {
	try {
		const response = await apiClient.post('/auth/signin', authData)
		if (response.status === 200) {
			return response.data
		}
	} catch (err: any) {
		if (err.response) {
			if (err.response.status === 400) {
				throw new Error(
					'Ошибка ввода данных. Проверьте правильность заполнения полей.'
				)
			} else if (err.response.status === 401) {
				throw new Error('Неверные учетные данные.')
			} else if (err.response.status === 500) {
				throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
			} else {
				throw new Error(`Неизвестная ошибка (${err.response.status}).`)
			}
		} else {
			throw new Error('Что-то пошло не так в авторизации: ' + err.message)
		}
	}
}

export const fetchProfile = async (accessToken: string) => {
	try {
		const response = await apiClient.get('/user/profile', {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		if (response.status === 200) {
			return response.data
		}
		throw new Error('Unexpected status')
	} catch (err: any) {
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

export const accountSignOut = async (accessToken: string) => {
	try {
		const response = await apiClient.post('/user/logout', undefined, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		if (response.status === 200) {
			return response.data
		}
	} catch (err: any) {
		if (err.response) {
			if (err.response.status === 500) {
				throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
			} else {
				throw new Error(`Неизвестная ошибка (${status}).`)
			}
		} else {
			throw new Error('Что-то пошло не так при выходе: ' + err.message)
		}
	}
}

export const refreshToken = async (refreshToken: string): Promise<Token> => {
	try {
		const response = await apiClient.post<Token>('/auth/refresh', {
			refreshToken,
		})
		console.log(response.data)
		return response.data
	} catch (err: any) {
		if (err.response?.status === 401) {
			throw new Error('Нужно авторизироваться заново')
		}
		throw new Error('Что-то пошло не так при проверке токена: ' + err.message)
	}
}
