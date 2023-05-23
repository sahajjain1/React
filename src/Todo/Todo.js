import React, { useState } from 'react';
import "./Todo.css";
import NewTodoForm from './NewTodoForm';
import { useDispatch, useSelector } from 'react-redux';
import { inNumber, DecNumber } from '../Actions/indexxx';

export default function Todo() {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);
  const myState = useSelector((state) => state.changeTheNumber)

  function addTodo(title) {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: currentTodos.length + 1,
        title: title,
        completed: false
      }
    ]);
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: completed };
        }
        return todo;
      })
    );
  }

  function deleteTodo(id) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }

  return (
    <div id='mainnn'>
      <div className="formmain">
        <NewTodoForm onSubmit={addTodo} />
        <h1 className='header'>Todo list</h1>
        <ul className='list'>
          {todos.length === 0 && <li>No items</li>}
          {todos.map(todo => (
            <li key={todo.id}>
              <label>
                <input
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                  type='checkbox'
                  name='item'
                  id='item'
                  checked={todo.completed}
                />
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)} className='btnn btnn-dangerr'>
                Delete
              </button>
            </li>
          ))}
        </ul>

        <div className='quantity'>
          <a className='quantity_minus' title='Decrement'onClick={() => dispatch(DecNumber())}><span>-</span></a>
          <input type="text" className='quantity_input' value={myState} />
          <a className='quantity_plus' title='Increment' onClick={() => dispatch(inNumber())}><span>+</span></a>

        </div>
      </div>
    </div>
  );
}
