export interface Todo {
	id: number
	title: string
	created: string
	isDone: boolean
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

export type FilterTodo = 'all' | 'inWork' | 'completed'
export type TodoRequest = Partial<Omit<Todo, 'id' | 'created'>>
export type CreateTodo = Pick<Todo, 'title'>
