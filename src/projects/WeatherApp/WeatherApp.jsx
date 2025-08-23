import { Outlet } from "react-router-dom";
import WeatherHeader from "./WeatherHeader.jsx";

function WeatherApp() {
  return (
    <>
      <WeatherHeader />
      <Outlet />
    </>
  );
}
export default WeatherApp;
