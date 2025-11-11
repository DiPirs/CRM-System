import axios from 'axios'

import type {
	Todo,
	TodoInfo,
	MetaResponse,
	FilterTodo,
	TodoRequest,
	CreateTodo,
} from '../types/task.types'
import type { AuthData, UserRegistration } from '../types/account.types'

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
	return apiClient
		.get('todos', {
			params: { filter: status },
		})
		.then(response => {
			return response.data
		})
		.then((data: MetaResponse<Todo, TodoInfo>) => {
			return data
		})
		.catch(err => {
			throw new Error(
				`Что-то сломалось при получении задач, повторите попытку. ` + err
			)
		})
}

export const createTodo = async (createData: CreateTodo) => {
	return apiClient
		.post('todos', createData)
		.then(response => {
			return response.data
		})
		.catch(err => {
			throw new Error(
				`Что-то сломалось при создании задачи, повторите попытку. ` + err
			)
		})
}

export const updateTodo = async (taskId: number, updateData: TodoRequest) => {
	return apiClient
		.put(`todos/${taskId}`, updateData)
		.then(response => {
			return response.data
		})
		.catch(err => {
			throw new Error(
				`Что-то сломалось при изменении задачи, повторите попытку. ` + err
			)
		})
}

export const deleteTodo = async (taskId: number): Promise<Response> => {
	return apiClient
		.delete(`todos/${taskId}`)
		.then(response => {
			return response.data
		})
		.catch(err => {
			throw new Error(
				`Что-то сломалось при удалении задачи, повторите попытку.  ` + err
			)
		})
}

export const accountSingUp = async (registrationData: UserRegistration) => {
	return apiClient
		.post(`/auth/signup`, registrationData)
		.then(response => {
			if (response.status === 201) {
				return response.data
			}
		})
		.catch(err => {
			if (err.response) {
				const status = err.response.status
				if (status === 400) {
					throw new Error(
						'Ошибка ввода данных. Проверьте правильность заполнения полей.'
					)
				} else if (status === 409) {
					throw new Error('Пользователь с такими данными уже существует.')
				} else if (status === 500) {
					throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
				}
			} else {
				throw new Error('Что-то пошло не так в регистрации: ' + err.message)
			}
		})
}

export const accountSignIn = async (authData: AuthData) => {
	return apiClient
		.post('/auth/signin', authData)
		.then(response => {
			if (response.status === 200) {
				return response.data
			}
		})
		.catch(err => {
			if (err.response) {
				const status = err.response.status

				if (status === 400) {
					throw new Error(
						'Ошибка ввода данных. Проверьте правильность заполнения полей.'
					)
				} else if (status === 401) {
					throw new Error('Неверные учетные данные.')
				} else if (status === 500) {
					throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
				} else {
					throw new Error(`Неизвестная ошибка (${status}).`)
				}
			} else {
				throw new Error('Что-то пошло не так в авторизации: ' + err.message)
			}
		})
}

export const fetchProfile = (accessToken: string) => {
	return apiClient
		.get('/user/profile', {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		.then(response => {
			if (response.status === 200) {
				return response.data
			}
			throw new Error('Unexpected status')
		})
		.catch(error => {
			if (error.response) {
				const status = error.response.status
				if (status === 401) {
					throw new Error('Неавторизованный доступ.')
				} else if (status === 500) {
					throw new Error('Внутренняя ошибка сервера.')
				} else {
					throw new Error(`Неизвестная ошибка (${status}).`)
				}
			} else if (error.request) {
				throw new Error('Сервер не отвечает.')
			} else {
				throw new Error('Что-то пошло не так.')
			}
		})
}

export const accountSignOut = async (accessToken: string) => {
	return apiClient
		.post('/user/logout', {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
		.then(response => {
			if (response.status === 200) {
				return response.data
			}
		})
		.catch(err => {
			if (err.response) {
				const status = err.response.status
				if (status === 500) {
					throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
				} else {
					throw new Error(`Неизвестная ошибка (${status}).`)
				}
			} else {
				throw new Error('Что-то пошло не так при выходе: ' + err.message)
			}
		})
}
