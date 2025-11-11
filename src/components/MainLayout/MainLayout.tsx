import React from 'react'
import PageMenu from '../PageMenu/PageMenu'

interface MainLayoutProps {
	children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<div className='layout'>
			<aside className='layout-aside'>
				<PageMenu />
			</aside>
			<main className='layout-content'>{children}</main>
		</div>
	)
}
