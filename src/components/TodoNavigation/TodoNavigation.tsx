import type { FilterTodo, TodoInfo } from '../../types/task.types'
import { Menu } from 'antd'
import {
	CalendarOutlined,
	CarryOutOutlined,
	FundOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

interface ITodoNavigation {
	todoFilter: TodoInfo
	setFilter: (fil: FilterTodo) => void
}

export default function TodoNavigation({
	todoFilter,
	setFilter,
}: ITodoNavigation) {
	const items: MenuItem[] = [
		{
			key: 'all',
			icon: <CalendarOutlined style={{ fontSize: '18px' }} />,
			label: `Все ${todoFilter.all}`,
		},
		{
			key: 'inWork',
			icon: <FundOutlined style={{ fontSize: '18px' }} />,
			label: `В прогрессе ${todoFilter.inWork}`,
		},
		{
			key: 'completed',
			icon: <CarryOutOutlined style={{ fontSize: '20px' }} />,
			label: `Завершенные ${todoFilter.completed}`,
		},
	]
	const switchTodoFilter: MenuProps['onClick'] = e => {
		const path: FilterTodo = e.key as FilterTodo
		setFilter(`${path}`)
	}

	return (
		<nav className='nav__taskList'>
			<Menu
				onClick={switchTodoFilter}
				style={{ display: `flex`, fontSize: '18px', background: 'none' }}
				defaultSelectedKeys={['/']}
				defaultOpenKeys={['sub1']}
				mode='inline'
				theme='dark'
				items={items}
			/>
		</nav>
	)
}
