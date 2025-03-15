import { useEffect } from "react";
import React, { useState } from "react";
// Include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

// Create your first component
const Home = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const AddItem = () => {
    if (input.trim() !== "") {
      setItems([items, input]);
      setInput("");
    }
  };

  const DeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  
  const todosUrl = "https://playground.4geeks.com/todo/";
  const getTodos = ()=> {
	fetch(todosUrl + "users/idm")
	.then((resp)=> resp.json())
	.then((data)=> setItems(data.todos));
  }
  getTodos();

  const addTodo = (input)=> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(input),
    }
      fetch(todosUrl + "todos/Wdrew232", options)
      .then((resp)=> resp.json())

      .then((data)=> console.log(data,"item added"))

  }
    

  useEffect(()=>{
	if (items.length == 0 )
	getTodos();
  },[])

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
          <button onClick={AddItem}>Add +</button>
        </div>
        <div className="List">
          {items.length === 0 ? (
            <p>No tasks, add a task</p>
          ) : (
            <ul>
              {items.map((item, index) => (
                <li key={index} className="todo-item">
                  {item.label}
                  <button className="delete-btn" onClick={() => DeleteItem(index)}>
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