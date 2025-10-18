import './App.scss'
import TaskForm from './components/TaskForm/TaskForm'
import TaskList from './components/TaskList/TaskList'

function App() {
	return (
		<>
			<div className='form__wrapper'>
				<TaskForm />
			</div>
			<hr />
			<div className='taskList__wrapper'>
				<TaskList />
			</div>
		</>
	)
}

export default App
