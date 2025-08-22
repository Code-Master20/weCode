import { useState } from "react";
import { useTodos } from "../../contexts/projectContexts/TodoContext";

function AddTodo() {
  const { todos, setTodos } = useTodos();
  const [todoMessage, setTodoMessage] = useState("");

  // Generate UniqueId
  function idGeneration() {
    return crypto.randomUUID();
  }

  // Date generation for unique todo-object
  function timeFormat() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date();
    let hours = date.getHours();
    let min = date.getMinutes();
    let day = date.getDate();
    const month = date.getMonth();
    const years = date.getFullYear();

    const ampm = hours < 12 ? "am" : "pm";
    let time = hours % 12;
    hours = time ? time : 12;
    min = min < 10 ? "0" + min : min;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;

    return `${years}-${months[month]}-${day} | ${hours}:${min}${ampm}`;
  }

  const handleAdd = (e) => {
    e.preventDefault();
    if (!todoMessage.trim()) return;

    let id = idGeneration();
    let todoDate = timeFormat();

    while (todos.some((todo) => todo.id === id)) {
      id = idGeneration();
    }

    const updatedTodos = [
      {
        id: id,
        todoMessage: todoMessage,
        todoComplete: false,
        todoDate: todoDate,
      },
      ...todos,
    ];
    setTodos(updatedTodos);
    setTodoMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
          Add Your Tasks
        </h1>

        <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Enter a todo..."
            value={todoMessage}
            onChange={(e) => setTodoMessage(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-md transition-all duration-200"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
