import { useSelector } from 'react-redux'

export function useAuth() {
	const { name, nickName, password, phoneNumber, email, token } = useSelector(
		state => state.user
	)

	return {
		isAuth: !!email,
		name,
		nickName,
		password,
		phoneNumber,
		email,
		token,
	}
}
