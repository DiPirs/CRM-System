import type { Todo } from '../../types/task.types'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import TodoItem from '../TodoItem/TodoItem'
import { List } from 'antd'

interface TodoListProps {
	tasks: Todo[]
	isLoading: boolean
	onFetchData: () => void
}

export default function TodoList({
	tasks,
	isLoading,
	onFetchData,
}: TodoListProps) {
	return (
		<>
			{isLoading && <LoadingSpinner />}
			{!isLoading && (
				<List
					bordered
					dataSource={tasks}
					style={{ border: 'none' }}
					renderItem={item => (
						<List.Item
							key={item.id}
							style={{
								display: 'flex',
								border: '2px solid var(--color-grey-1)',
								borderRadius: '10px',
								marginBottom: '10px',
							}}
						>
							<TodoItem task={item} onFetchData={onFetchData} />
						</List.Item>
					)}
				/>
			)}
		</>
	)
}
