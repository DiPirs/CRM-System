import style from './ProfilePage.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootStateStore } from '../../store/store'
import type { UserState } from '../../types/user'
import { removeProfile } from '../../store/user/slices/userSlice'
import { PoweroffOutlined } from '@ant-design/icons'

export default function ProfilePage() {
	const auth: UserState = useSelector<RootStateStore>(state => state.auth)
	const profile = auth?.profile
	const navigation = useNavigate()
	const dispatch = useDispatch()

	function handleLogout() {
		dispatch(removeProfile())
		localStorage.removeItem('refreshToken')
		navigation('/login')
	}

	return (
		<div className={style.layout}>
			<h1 className={style.heading}>Мой аккаунт</h1>
			<div className={style.userInfo}>
				<p className={style.infoText}>Имя: {profile?.username}</p>
				<p className={style.infoText}>Электронная почта: {profile?.email}</p>
				<p className={style.infoText}>Номер телефона: {profile?.phoneNumber}</p>
			</div>
			<button className={style.logout} onClick={handleLogout}>
				<PoweroffOutlined />
				<span>Выйти из аккаунта</span>
			</button>
		</div>
	)
}
