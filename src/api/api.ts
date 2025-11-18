import axios from 'axios'

import type {
	Todo,
	TodoInfo,
	MetaResponse,
	FilterTodo,
	TodoRequest,
	CreateTodo,
} from '../types/task.types'

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
