import style from './MainLayout.module.scss'
import PageMenu from '../PageMenu/PageMenu'
import type { ChildrenProps } from '../../types/component'

export default function MainLayout({ children }: ChildrenProps) {
	return (
		<div className={style.layout}>
			<aside className={style.layout_aside}>
				<PageMenu />
			</aside>
			<main className={style.layout_content}>{children}</main>
		</div>
	)
}
