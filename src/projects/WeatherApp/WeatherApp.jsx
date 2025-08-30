import { Outlet } from "react-router-dom";
import WeatherHeader from "./WeatherHeader.jsx";
import { useWeather } from "../../contexts/projectContexts/WeatherContext.jsx";
import { useEffect, useState } from "react";

function WeatherApp() {
  const { localisedData, setLocalisedData, currentWeather } = useWeather();
  const [formatedTime, setFormatedTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const date = new Date();
      let hours = date.getHours();
      const min = date.getMinutes();
      const sec = date.getSeconds();

      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      const formattedMin = min.toString().padStart(2, "0");
      const formattedSec = sec.toString().padStart(2, "0");

      setFormatedTime(`${hours}:${formattedMin}:${formattedSec} ${ampm}`);
    }

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  function getCoordinateEndpoints(lat, lon) {
    if (lat === undefined || lon === undefined) return "Loading...";

    const latDir = lat >= 0 ? "N" : "S";
    const lonDir = lon >= 0 ? "E" : "W";
    return `${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(lon).toFixed(
      2
    )}°${lonDir}`;
  }

  function dateFormatter(epoch) {
    const date = new Date(epoch * 1000); // Convert epoch to milliseconds
    let years = date.getFullYear();
    let months = date.getMonth() + 1;
    let days = date.getDate();

    months = months < 10 ? "0" + months : months;
    days = days < 10 ? "0" + days : days;

    return `${years}-${months}-${days}`;
  }

  return (
    <div className=" from-blue-50 to-indigo-100">
      <WeatherHeader />

      {/* Top Bar with Weather Information */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Location Info - Adjusts font size for mobile */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink">
            <div className="bg-white bg-opacity-20 p-1 md:p-2 rounded-full flex-shrink-0">
              <svg
                className="w-4 h-4 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <div className="min-w-0 overflow-hidden">
              <h2 className="text-white font-bold text-sm md:text-lg truncate">
                {localisedData.name || "Current Location"}
              </h2>
              <p className="text-indigo-100 text-xs md:text-sm truncate">
                {localisedData.region && localisedData.country
                  ? `${localisedData.region}, ${localisedData.country}`
                  : "Loading location..."}
              </p>
            </div>
          </div>

          {/* Time Display - Adjusts padding and font size for mobile */}
          <div className="bg-white bg-opacity-20 p-1 md:p-3 rounded-lg mx-2 flex-shrink-0">
            <p className="text-white font-bold text-xs md:text-xl whitespace-nowrap text-center">
              {dateFormatter(currentWeather.last_updated_epoch)}
            </p>
            <p className="text-white font-bold text-xs md:text-xl whitespace-nowrap">
              {formatedTime}
            </p>
          </div>

          {/* Coordinates - Adjusts font size for mobile */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <div className="bg-white bg-opacity-20 p-1 md:p-2 rounded-full hidden sm:flex">
              <svg
                className="w-4 h-4 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                ></path>
              </svg>
            </div>
            <div className="text-right">
              <p className="text-indigo-100 text-xs md:text-sm hidden sm:block">
                Coordinates
              </p>
              <p className="text-white font-medium text-xs md:text-sm whitespace-nowrap">
                {getCoordinateEndpoints(localisedData.lat, localisedData.lon)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default WeatherApp;
