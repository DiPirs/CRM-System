import type { MetaResponse, Todo, TodoInfo } from '../types/task.types'

export const fetchDataApi = async (status = 'all') => {
	try {
		const response = await fetch(
			`https://easydev.club/api/v1/todos?filter=${status}`
		)
		const data: MetaResponse<Todo, TodoInfo> = await response.json()
		return data
	} catch (err) {
		console.error('Error:', err)
	}
}

export const submitTaskApi = async (newTitle: string) => {
	try {
		const response = await fetch(`https://easydev.club/api/v1/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: newTitle,
				isDone: false,
			}),
		})
		return response.json()
	} catch (err) {
		console.error('Error:', err)
	}
}

export const changeTaskApi = async (
	taskId: number,
	newValue: string,
	isDone: boolean
) => {
	try {
		const response = await fetch(
			`https://easydev.club/api/v1/todos/${taskId}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: newValue,
					isDone: isDone,
				}),
			}
		)
		return response.json()
	} catch (err) {
		console.error('Error:', err)
	}
}

export const deleteTaskApi = async (taskId: number) => {
	try {
		const response = await fetch(
			`https://easydev.club/api/v1/todos/${taskId}`,
			{
				method: 'DELETE',
			}
		)

		if (!response.ok) {
			throw new Error(`Failed to delete task. Status: ${response.status}`)
		}

		return { success: true }
	} catch (err) {
		console.error('Error:', err)
	}
}

export const doneTaskApi = async (
	taskId: number,
	value: string,
	isDone: boolean
) => {
	try {
		const response = await fetch(
			`https://easydev.club/api/v1/todos/${taskId}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: value,
					isDone: isDone,
				}),
			}
		)
		return response.json()
	} catch (err) {
		console.error(err)
	}
}
