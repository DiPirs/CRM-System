import ButtonNav from '../ButtonNav/ButtonNav'
import './TaskList.scss'

export default function TaskList() {
	return (
		<>
			<h1>Мои задачи</h1>
			<hr />
			<nav>
				<ButtonNav textButton='Все задачи' />
				<ButtonNav textButton='Активные' />
				<ButtonNav textButton='Законченные' />
			</nav>
			<div>
				<ul>
					<li>
						<input type='checkbox' />
						<input type='text' value={'Task 1'} />
						<button>del</button>
						<button>edi</button>
					</li>
					<li>
						<input type='checkbox' />
						<input type='text' value={'Task 1'} />
						<button>del</button>
						<button>edi</button>
					</li>
				</ul>
			</div>
		</>
	)
}
