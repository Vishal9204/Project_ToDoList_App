import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import Footer from './Components/Footer';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    let newTodo = event.target.value;
    if(newTodo.length > 60) {
      //split the string into new lines
      let splitString = newTodo.split('');
      let newString = '';
      for(let i = 0; i < splitString.length; i++) {
        newString += splitString[i];
        if(i % 60 === 0 && i !== 0) {
          newString += '\n';
        }
      }
      newTodo = newString;
    }
    setTodo(newTodo);
  };

  const handleAdd = () => {
    if (todo.trim() === '') return; // Prevent adding empty todos
    setTodo('');
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
  };

  const handleEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    if (itemToEdit) {
      setTodo(itemToEdit.todo);
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleCheckbox = (id) => {
    setTodos(todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto w-3/4 my-10 p-8 rounded-lg shadow-lg bg-gray-100 min-h-screen flex flex-col space-y-6 hover:bg-gray-200 duration-200">
        <div className="addTodo bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Enter a new todo..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            onClick={handleAdd}
            className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add Todo
          </button>
        </div>
        <div className="todos bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Todos</h2>
          {todos.length === 0 ? (
            <p className="text-gray-500">No todos added yet.</p>
          ) : (
            todos.map((item) => (
              <div key={item.id} className="todo flex items-center justify-between p-3 mb-3 bg-gray-50 rounded-md shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <input
                    id={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckbox(item.id)}
                    className="form-checkbox h-5 w-5 text-violet-600"
                  />
                  <span className={`text-lg ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {item.todo}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-1 px-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
