import { useState } from 'react'
import './index.css'
import Todo from './Todo'
import Form from './Form'
import FilterButton from './FilterButton'

const DATA = [
  { id: 'todo-0', name: "Eat", completed: true },
  { id: 'todo-1', name: "Sleep", completed: false },
  { id: 'todo-2', name: "Repeat", completed: false }
];

let id = DATA.length;

const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);


function TodoList() {
  const [todos, setTodos] = useState([...DATA]);
  const [filter, setFilter] = useState('All');

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const addTodo = (name) => {
    const newTodo = { id: `todo-${id++}`, name, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTaskCompleted = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id)
        return { ...todo, completed: !todo.completed };
      return todo;
    })
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, newName) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id)
        return { ...todo, name: newName };
      return todo;
    })
    setTodos(updatedTodos);
  }

  const todoList = todos
    .filter(FILTER_MAP[filter])
    .map(todo => (
      <Todo
        id={todo.id}
        name={todo.name}
        completed={todo.completed}
        key={todo.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    ));

  const headingText = `${todos.length} ${todos.length !== 1 ? 'tasks' : 'task'} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>
      <Form addTodo={addTodo} />
      <div className='filters btn-group stack-exception'>
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {todoList}
      </ul>
    </div>
  )
}

export default TodoList