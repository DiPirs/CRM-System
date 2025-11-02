import type {
	Todo,
	TodoInfo,
	MetaResponse,
	FilterTodo,
	TodoRequest,
	CreateTodo,
} from '../types/task.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchTodo = async (
	status: FilterTodo = 'all'
): Promise<MetaResponse<Todo, TodoInfo>> => {
	return fetch(`${API_BASE_URL}/todos?filter=${status}`)
		.then(response => {
			return response.json()
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
	return fetch(`${API_BASE_URL}/todos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(createData),
	})
		.then(response => {
			return response.json()
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
	return fetch(`${API_BASE_URL}/todos/${taskId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updateData),
	})
		.then(response => {
			return response.json()
		})
		.catch(err => {
			throw new Error(
				`Something error in change task, try again.\nError: ` + err
			)
		})
}

export const deleteTodo = async (taskId: number): Promise<Response> => {
	return fetch(`${API_BASE_URL}/todos/${taskId}`, {
		method: 'DELETE',
	}).catch(err => {
		throw new Error(`Something error in delete task, try again.\nError: ` + err)
	})
}
