import { useState } from "react";
import { useTodos } from "../../contexts/projectContexts/TodoContext";

function RemainedTodos() {
  const { todos, setTodos, setCompleteTodos } = useTodos();
  const [editedMessage, setEditedMessage] = useState("");
  const [editedId, setEditedId] = useState(null);

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

  // Handle Edit / Save Button
  const handleEditButton = (todo) => {
    if (editedId === todo.id) {
      // Save edited todo
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, todoMessage: editedMessage } : t
        )
      );
      setEditedMessage("");
      setEditedId(null);
    } else {
      // Switch to edit mode
      setEditedId(todo.id);
      setEditedMessage(todo.todoMessage);
    }
  };

  // Handle Complete
  const handleCompleteButton = (todo) => {
    // remove from todos
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));

    // push to completed
    setCompleteTodos((prevComplete) => [
      { ...todo, todoComplete: true, todoDate: timeFormat() },
      ...prevComplete,
    ]);
  };

  return (
    <div className="flex flex-col gap-6 pt-6 items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-blue-700 font-bold tracking-wide drop-shadow-md text-center">
        Your Remained Tasks
      </h1>

      {todos
        .filter((t) => !t.todoComplete) // only incomplete
        .map((todo) => (
          <div
            key={todo.id}
            className="flex flex-col sm:flex-row sm:flex-nowrap gap-3 sm:gap-4 items-start sm:items-center justify-between bg-white shadow-md rounded-2xl px-4 sm:px-6 py-3 w-full max-w-2xl transition-transform hover:scale-[1.02]"
          >
            {editedId === todo.id ? (
              <input
                type="text"
                className="text-base sm:text-lg font-semibold text-gray-800 flex-1 border border-gray-300 rounded-lg px-2"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
              />
            ) : (
              <h1 className="text-base sm:text-lg font-semibold text-gray-800 flex-1 break-words">
                {todo.todoMessage}
              </h1>
            )}

            <h1 className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              {todo.todoDate}
            </h1>

            <div className="flex flex-row gap-2 w-full sm:w-auto">
              <button
                className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-xl bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-white font-medium shadow text-sm sm:text-base"
                onClick={() => handleEditButton(todo)}
              >
                {editedId === todo.id ? "Save" : "Edit"}
              </button>
              <button
                className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-xl bg-green-500 cursor-pointer hover:bg-green-600 text-white font-medium shadow text-sm sm:text-base"
                onClick={() => handleCompleteButton(todo)}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default RemainedTodos;
