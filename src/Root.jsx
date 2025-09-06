import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import TodoProvider from "./contexts/projectContexts/TodoContext";
import WeatherProvider from "./contexts/projectContexts/WeatherContext";
import CurrencyRateProvider from "./contexts/projectContexts/CurrencyRateContext";

function Root() {
  return (
    <CurrencyRateProvider>
      <WeatherProvider>
        <TodoProvider>
          <Header />
          <Outlet />
        </TodoProvider>
      </WeatherProvider>
    </CurrencyRateProvider>
  );
}

export default Root;
