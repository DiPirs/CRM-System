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
export const fetchTodo = async (
	status: FilterTodo = 'all'
): Promise<MetaResponse<Todo, TodoInfo>> => {
	return axios
		.get(`${API_BASE_URL}/todos?filter=${status}`)
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
	return axios
		.post(`${API_BASE_URL}/todos`, createData)
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
	return axios
		.put(`${API_BASE_URL}/todos/${taskId}`, updateData)
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
	return axios
		.delete(`${API_BASE_URL}/todos/${taskId}`)
		.then(response => {
			return response.data
		})
		.catch(err => {
			throw new Error(
				`Something error in delete task, try again.\nError: ` + err
			)
		})
}
