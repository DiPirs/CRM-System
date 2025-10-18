import './ButtonNav.scss'

interface IButtonProps {
	textButton: string
}

export default function ButtonNav({ textButton }: IButtonProps) {
	return (
		<>
			<button>{textButton}</button>
		</>
	)
}
