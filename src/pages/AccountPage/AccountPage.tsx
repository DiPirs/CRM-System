import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../store/user/Slices/userSlice'
import { accountSignOut } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { selectUserStore } from '../../modules/user/selectors'
import { tokenManager } from '../../store/utils/tokenManager'

export default function AccountPage() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { profile } = useSelector(selectUserStore)
	const token = tokenManager.getAccessToken()

	const handleSignOutAccount = async () => {
		if (token) {
			try {
				await accountSignOut(token)
				dispatch(removeUser())
				tokenManager.clearTokens()
				navigate('/login')
			} catch (err) {
				console.log(err)
				dispatch(removeUser())
				navigate('/login')
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
			</div>

			<Button type='primary' onClick={handleSignOutAccount}>
				Выйти из аккаунта
			</Button>
		</>
	)
}
