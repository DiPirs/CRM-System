import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
	{ key: '/', icon: <PieChartOutlined />, label: 'Задачи' },
	{ key: '/profile', icon: <DesktopOutlined />, label: 'Профиль' },
]

export default function PageMenu() {
	const navigate = useNavigate()
	const location = useLocation()

	const handleSwitchPage: MenuProps['onClick'] = e => {
		const path = e.key
		navigate(path)
	}

	return (
		<div style={{ width: 200 }}>
			<nav>
				<Menu
					onClick={handleSwitchPage}
					style={{ minHeight: '100vh' }}
					selectedKeys={[location.pathname]}
					mode='inline'
					theme='dark'
					items={items}
				/>
			</nav>
		</div>
	)
}
