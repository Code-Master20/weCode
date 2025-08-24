import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import TodoProvider from "./contexts/projectContexts/TodoContext";
import WeatherProvider from "./contexts/projectContexts/WeatherContext";

function Root() {
  return (
    <WeatherProvider>
      <TodoProvider>
        <Header />
        <Outlet />
      </TodoProvider>
    </WeatherProvider>
  );
}

export default Root;
