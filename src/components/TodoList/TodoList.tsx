import type { Todo } from '../../types/task.types'
import TodoItem from '../TodoItem/TodoItem'
import { List } from 'antd'

interface ITodoList {
	tasks: Todo[]
	isLoading: boolean
	onFetchData: () => void
	getPaused: (status: boolean) => void
}

export default function TaskList({
	tasks,
	isLoading,
	onFetchData,
	getPaused,
}: ITodoList) {
	return (
		<>
			{isLoading && <span>Loading</span>}
			{!isLoading && (
				<List
					bordered
					dataSource={tasks}
					style={{ border: 'none' }}
					renderItem={item => (
						<List.Item
							style={{
								display: 'flex',
								border: '2px solid var(--color-grey-1)',
								borderRadius: '10px',
								marginBottom: '10px',
							}}
						>
							<TodoItem
								key={item.id}
								task={item}
								onFetchData={onFetchData}
								getPaused={getPaused}
							/>
						</List.Item>
					)}
				/>
			)}
		</>
	)
}
