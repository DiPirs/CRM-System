import type {
	Todo,
	TodoInfo,
	MetaResponse,
	FilterTodo,
	TodoRequest,
	CreateTodo,
} from '../types/task.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

let httpError: number = 0

export const fetchTodo = async (
	status: FilterTodo = 'all'
): Promise<MetaResponse<Todo, TodoInfo>> => {
	return fetch(`${API_BASE_URL}/todos?filter=${status}`)
		.then(response => {
			if (!response.ok) {
				httpError = response.status
			}
			return response.json()
		})
		.then((data: MetaResponse<Todo, TodoInfo>) => {
			return data
		})
		.catch(() => {
			throw new Error(
				`Something error in fetchData task, try again.\nError code: ${httpError}`
			)
		})
}

export const createTodo = async (createData: CreateTodo): Promise<void> => {
	return fetch(`${API_BASE_URL}/todos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(createData),
	})
		.then(response => {
			if (!response.ok) {
				httpError = response.status
			}
			return response.json()
		})
		.catch(() => {
			throw new Error(
				`Something error in submit task, try again.\nError code: ${httpError}`
			)
		})
}

export const updateTodo = async (
	taskId: number,
	updateData: TodoRequest
): Promise<void> => {
	return fetch(`${API_BASE_URL}/todos/${taskId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updateData),
	})
		.then(response => {
			if (!response.ok) {
				httpError = response.status
			}
			return response.json()
		})
		.catch(() => {
			throw new Error(
				`Something error in change task, try again.\nError code: ${httpError}`
			)
		})
}

export const deleteTodo = async (taskId: number): Promise<void> => {
	return fetch(`${API_BASE_URL}/todos/${taskId}`, {
		method: 'DELETE',
	})
		.then(response => {
			if (!response.ok) {
				httpError = response.status
			}
		})
		.catch(() => {
			throw new Error(
				`Something error in delete task, try again.\nError code: ${httpError}`
			)
		})
}
