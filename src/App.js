import React, {useState, useEffect} from 'react'
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList';

function App() {

	const [inputText, setInputText] = useState('');
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState('all');
	const [filteredTodos, setFilteredTodos] = useState([]);

	useEffect(() => {
		getLocalTodos()
	}, [])

	useEffect(() => {
		filterHandler();
		saveLocalTodos();
	}, [todos, status]);
	const filterHandler = () => {
		switch (status) {
			case 'completed':
				setFilteredTodos(todos.filter(todo => todo.completed === true));
				break;
			case 'uncompleted':
				setFilteredTodos(todos.filter(todo => todo.completed === false));
				break;
			default:
				setFilteredTodos(todos);
				break;
		}
	}

	const saveLocalTodos = () => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}
	const getLocalTodos = () => {
		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([]))
		} else {
			let todoLocal = JSON.parse(localStorage.getItem('todos', JSON.stringify(todos)));
			setTodos(todoLocal)
		}
	}

	return (
		<div className="App">
			<Form
				inputText={inputText}
				todos={todos}
				setInputText={setInputText}
				setTodos={setTodos}
				setStatus={setStatus}
			/>
			<TodoList
				setTodos={setTodos}
				todos={todos}
				key={todos.id}
				filteredTodos={filteredTodos}
			/>
		</div>
	);
}

export default App;
