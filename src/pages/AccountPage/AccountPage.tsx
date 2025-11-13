import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser, type UserState } from '../../store/slices/userSlice'
import { accountSignOut } from '../../api/api'
import { useNavigate } from 'react-router-dom'

export default function AccountPage() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const profile = useSelector(
		(state: { user: UserState }) => state.user.profile
	)
	const tokens = useSelector((state: { user: UserState }) => state.user.tokens)

	const handleSignOutAccount = async () => {
		if (!profile || !tokens) {
			return <p>Пользователь не авторизован.</p>
		}

		if (tokens?.accessToken) {
			try {
				await accountSignOut(tokens.accessToken)
				dispatch(removeUser())
				navigate('/login')
			} catch (err) {
				console.log(err)
			}
		}
	}

	return (
		<>
			<div>
				<h1>Профиль</h1>
				<p>Имя: {profile?.username}</p>
				<p>Email: {profile?.email}</p>
				<p>Телефон: {profile?.phoneNumber}</p>
				<p>Токен access: {tokens?.accessToken}</p>
				<p>Токен refresh: {tokens?.refreshToken}</p>
			</div>

			<Button type='primary' onClick={handleSignOutAccount}>
				Выйти из аккаунта
			</Button>
		</>
	)
}
