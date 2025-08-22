import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import TodoProvider from "./contexts/projectContexts/TodoContext";

function Root() {
  return (
    <TodoProvider>
      <Header />
      <Outlet />
    </TodoProvider>
  );
}

export default Root;
