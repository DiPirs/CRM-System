import React from 'react'
import PageMenu from '../PageMenu/PageMenu'
import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'

interface MainLayoutProps {
	children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<Layout>
			<Sider style={{ maxHeight: '100vh' }}>
				<PageMenu />
			</Sider>
			<Layout>
				<main className='layout-content'>{children}</main>
			</Layout>
		</Layout>
	)
}
