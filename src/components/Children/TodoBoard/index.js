import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([{ text: newTodo, checked: false }, ...todos]);
      setNewTodo("");
    }
  };

  const toggleChecked = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;
    setTodos(updatedTodos);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2">
        <button className="" onClick={addTodo} onKeyDown={handleKeyDown}>
          {/* Plus icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <input
          type="text"
          className="w-full py-2 bg-transparent outline-none border-b-[1px]"
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
      </div>

      {/* list of todos  */}
      <ul className="space-y-4 pt-6">
        {todos.map((todo, index) => (
          <li key={index} className="flex items-center group relative">
            <label className="flex items-center cursor-pointer flex-grow">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => toggleChecked(index)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 border-2 rounded-sm transition-all duration-200 
                  ${
                    todo.checked
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                  } 
                  flex justify-center items-center`}
              >
                {todo.checked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`ml-2 ${
                  todo.checked ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => deleteTodo(index)}
              className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
