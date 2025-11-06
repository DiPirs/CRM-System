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
				`Something error in fetchData task, try again.\nError: ` + err
			)
		})
}

export const createTodo = async (createData: CreateTodo): Promise<void> => {
	return apiClient
		.post('todos', createData)
		.then(response => {
			return response.data
		})
		.catch(err => {
			throw new Error(
				`Something error in submit task, try again.\nError: ` + err
			)
		})
}

export const updateTodo = async (
	taskId: number,
	updateData: TodoRequest
): Promise<void> => {
	return apiClient
		.put(`todos/${taskId}`, updateData)
		.then(response => {
			return response.data
		})
		.catch(err => {
			throw new Error(
				`Something error in change task, try again.\nError: ` + err
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
				`Something error in delete task, try again.\nError: ` + err
			)
		})
}
