import React, { useState, useEffect } from "react";

const Home = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const todosUrl = "https://playground.4geeks.com/todo/";

  const getTodos = () => {
    fetch(`${todosUrl}users/idm`)
      .then((resp) => resp.json())
      .then((data) => setItems(data.todos || []));
  };

  const addTodo = (todoObject) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoObject),
    };

    fetch(`${todosUrl}todos/Wdrew232`, options)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data, "item added");
        setItems([...items, todoObject]); 
      });
  };

  const deleteTodo = (index) => {
    const itemToDelete = items[index];
    const options = {
      method: "DELETE",
    };

    fetch(`${todosUrl}todos/${itemToDelete.id}`, options)
      .then((resp) => resp.json())
      .then(() => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
      });
  };

  useEffect(() => {
    if (items.length === 0) getTodos();
  }, []);

  return (
    <div className="text-center">
      <div className="todoList">
        <div className="header">
          <h1>ToDo's</h1>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
          />
          <button
            onClick={() => {
              const todoObject = {
                label: input,
                is_done: false,
              };
              addTodo(todoObject);
              setInput(""); 
            }}
          >
            Add +
          </button>
        </div>
        <div className="List">
          {items.length === 0 ? (
            <p>No tasks, add a task</p>
          ) : (
            <ul>
              {items.map((item, index) => (
                <li key={index} className="todo-item">
                  {item.label}
                  <button className="delete-btn" onClick={() => deleteTodo(index)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
