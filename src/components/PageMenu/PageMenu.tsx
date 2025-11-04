import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
	{ key: '/', icon: <PieChartOutlined />, label: 'Задачи' },
	{ key: '/account', icon: <DesktopOutlined />, label: 'Профиль' },
]

export default function PageMenu() {
	const navigate = useNavigate()

	const onClick: MenuProps['onClick'] = e => {
		const path = e.key
		navigate(path)
	}
	return (
		<div style={{ width: 200 }}>
			<nav>
				<Menu
					onClick={onClick}
					style={{ minHeight: '100vh' }}
					defaultSelectedKeys={['/']}
					defaultOpenKeys={['sub1']}
					mode='inline'
					theme='dark'
					items={items}
				/>
			</nav>
		</div>
	)
}
