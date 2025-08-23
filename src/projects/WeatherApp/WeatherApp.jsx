import { Outlet } from "react-router-dom";
import WeatherHeader from "./wEATHERhEADER.JSX";

function WeatherApp() {
  return (
    <>
      <WeatherHeader />
      <Outlet />
    </>
  );
}
export default WeatherApp;
