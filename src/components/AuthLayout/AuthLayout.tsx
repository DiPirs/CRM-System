import React from 'react'
import style from './AuthLayout.module.scss'

interface AuthLayoutProps {
	children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className={style.layout}>
			<img src='/illustration.svg' alt='' style={{ maxHeight: '100vh' }} />
			<div className={style.layoutContainer}>{children}</div>
		</div>
	)
}
