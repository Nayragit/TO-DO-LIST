import React, { useState, useEffect } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";

function App() {
  const url = "https://jsonplaceholder.typicode.com/todos";

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = (data) => {
    const updatedTodoArr = [...allTodos];
    updatedTodoArr.push(data);
    setTodos(updatedTodoArr);

    const response = fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((response) => response.json());
  };

  const handleAddTodo = () => {
    const newTodoItem = {
      id: "uid",
      title: newTitle,
      completed: false
    };
    handleAdd(newTodoItem);
  };

  const handleEditTodo = (id, data) => {
    const updatedTodos = allTodos.map((todo) => {
      if (todo.id !== id) return todo;
      return data;
    });
    setTodos(updatedTodos);

    const response = fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((response) => response.json());
  };

  const handleCompleted = (id) => {
    let completedTodo = {};
    const updatedTodo = allTodos.map((todo) => {
      if (todo.id !== id) return todo;
      completedTodo = { ...todo, completed: true };
      return completedTodo;
    });
    setTodos(updatedTodo);
    handleEditTodo(id, completedTodo);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodo = allTodos.filter((todo) => todo.id !== id);
    setTodos(updatedTodo);
    fetch(`${url}/${id}`, { method: "DELETE" });
  };

  useEffect(() => {
    const fetchAllTodos = async () => {
      const newAddTodo = await fetch(url).then((response) => response.json());
      setTodos(newAddTodo);
    };
    fetchAllTodos();
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <div className="btn-area">
            <button
              className={`isCompleteScreen ${
                isCompleteScreen === false && "active"
              }`}
              onClick={() => setIsCompleteScreen(false)}
            >
              Todo
            </button>
            <button
              className={`isCompleteScreen ${
                isCompleteScreen === true && "active"
              }`}
              onClick={() => setIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>
        </div>
        <div className="todo-list">
          {allTodos.map((item) => (
            <TodoItem
              data={item}
              isCompleteScreen={isCompleteScreen}
              handleDeleteTodo={handleDeleteTodo}
              handleCompleted={handleCompleted}
              handleEditTodo={handleEditTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;



































