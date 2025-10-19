export interface Todo {
	id: number
	title: string
	created: string
	isDone: boolean
}

export interface ITaskItem {
	task: Todo
	onChange: (newValue: string) => void
	onDelete: (taskId: number) => void
}

export interface TodoInfo {
	all: number
	completed: number
	inWork: number
}

export interface MetaResponse<T, N> {
	data: T[]
	info?: N
	meta: {
		totalAmount: number
	}
}
