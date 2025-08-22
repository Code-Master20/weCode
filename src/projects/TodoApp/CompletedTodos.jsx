import { useTodos } from "../../contexts/projectContexts/TodoContext";

function CompletedTodos() {
  const { completeTodos, setCompleteTodos } = useTodos();

  return (
    <div className="flex flex-col gap-6 pt-6 items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-green-700 font-bold tracking-wide drop-shadow-md text-center">
        Your Completed Tasks
      </h1>

      {completeTodos.length === 0 ? (
        <p className="text-gray-500 text-base sm:text-lg">
          No tasks completed yet.
        </p>
      ) : (
        completeTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex flex-col sm:flex-row sm:flex-nowrap gap-3 sm:gap-4 items-start sm:items-center justify-between bg-white shadow-md rounded-2xl px-4 sm:px-6 py-3 w-full max-w-2xl"
          >
            <h1 className="text-base sm:text-lg font-semibold text-gray-800 flex-1 break-words line-through">
              {todo.todoMessage}
            </h1>

            <h1 className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              {todo.todoDate}
            </h1>

            <button
              className="flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-xl bg-red-500 cursor-pointer hover:bg-red-600 text-white font-medium shadow text-sm sm:text-base"
              onClick={() =>
                setCompleteTodos((prev) => prev.filter((t) => t.id !== todo.id))
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default CompletedTodos;
