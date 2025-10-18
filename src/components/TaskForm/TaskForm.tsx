import './TaskForm.scss'

export default function TaskForm() {
	const submitTask = () => {
		console.log('Таска записана')
	}

	return (
		<>
			<form
				className='form__createNewTask'
				onSubmit={e => {
					e.preventDefault()
					submitTask()
				}}
			>
				<label className='input__container'>
					<span className='container__description'>Что вы хотели сделать</span>
					<input
						name='input__task'
						type='text'
						placeholder='Введите задачу...'
						className='container__input'
					/>
				</label>
				<button className='form__button button_submitTask'>
					Записать задачу
				</button>
			</form>
		</>
	)
}
