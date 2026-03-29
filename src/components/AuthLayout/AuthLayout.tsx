import type { ChildrenProps } from '../../types/component'
import style from './AuthLayout.module.scss'

export default function AuthLayout({ children }: ChildrenProps) {
	return (
		<div className={style.layoutContainer}>
			<img
				src='/illustration.svg'
				alt='Страница авторизации'
				className={style.page_illustration}
			/>
			<div className={style.layoutContent}>{children}</div>
		</div>
	)
}
