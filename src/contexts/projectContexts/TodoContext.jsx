import { useContext, createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");

    return todosFromLocalStorage
      ? JSON.parse(todosFromLocalStorage)
      : [
          {
            id: crypto.randomUUID(),
            todoMessage: `Learning JS`,
            todoComplete: false,
            todoDate: new Date().toDateString(),
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [completeTodos, setCompleteTodos] = useState(() => {
    const completeTodosFromLocalStorage = localStorage.getItem("completeTodos");

    return completeTodosFromLocalStorage
      ? JSON.parse(completeTodosFromLocalStorage)
      : [];
  });

  useEffect(() => {
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  }, [completeTodos, todos]);

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, setCompleteTodos, completeTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => useContext(TodoContext);
