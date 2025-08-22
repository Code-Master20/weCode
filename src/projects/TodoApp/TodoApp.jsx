import { Outlet } from "react-router-dom";
import TodoHeader from "./TodoHeader";

function TodoApp() {
  return (
    <>
      <TodoHeader />
      <Outlet />
    </>
  );
}
export default TodoApp;
