import React, { useState } from 'react';
import "./Todo.css";

export default function NewTodoForm(props) {
  const [newItem, setNewItem] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim() === '') {
      return;
    }
    props.onSubmit(newItem);
    setNewItem('');
  }

  return (
    <form className='new-item-form' onSubmit={handleSubmit}>
      <div className='form-row'>
        <label htmlFor='item'>New Item</label>
        <input
          onChange={e => setNewItem(e.target.value)}
          value={newItem}
          type='text'
          name='item'
          id='item'
        />
      </div>
      <button type="submit" className='btnn'>Add</button>
    </form>
  );
}
