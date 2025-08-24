import { NavLink } from "react-router-dom";
import { useState } from "react";

function WeatherHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md sticky top-0 z-20">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 relative">
        {/* App Title on the left */}
        <div className="text-white font-bold text-xl">WeatherApp</div>

        {/* Hamburger menu for mobile - moved to right side */}
        <button
          className="sm:hidden focus:outline-none z-30 bg-indigo-700 p-2 rounded"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 relative flex flex-col justify-center">
            <span
              className={`block w-6 h-0.5 bg-yellow-400 rounded transform transition duration-300 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-yellow-400 rounded my-1.5 transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-yellow-400 rounded transform transition duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Centered Nav links - hidden on mobile */}
        <div className="hidden sm:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/projects/weather/current-weather"
            className={({ isActive }) =>
              `text-lg font-semibold tracking-wide transition-all duration-200 py-2 px-4 rounded-lg
               ${
                 isActive
                   ? "text-yellow-400 bg-indigo-800"
                   : "text-white hover:bg-indigo-500"
               }`
            }
          >
            Current Weather
          </NavLink>

          <NavLink
            to="/projects/weather/forecast-14d"
            className={({ isActive }) =>
              `text-lg font-semibold tracking-wide transition-all duration-200 py-2 px-4 rounded-lg
               ${
                 isActive
                   ? "text-yellow-400 bg-indigo-800"
                   : "text-white hover:bg-indigo-500"
               }`
            }
          >
            14D Forecast
          </NavLink>
        </div>

        {/* Mobile menu - appears below when hamburger is clicked */}
        <div
          className={`
            sm:hidden
            ${menuOpen ? "flex flex-col" : "hidden"} 
            bg-indigo-700
            absolute top-full left-0 w-full
            px-4 py-3
            shadow-lg
          `}
        >
          <NavLink
            to="/projects/weather/current-weather"
            className={({ isActive }) =>
              `text-lg font-semibold tracking-wide transition-all duration-200 py-2 px-4 rounded-lg my-1
               ${
                 isActive
                   ? "text-yellow-400 bg-indigo-800"
                   : "text-white hover:bg-indigo-500"
               }`
            }
            onClick={() => setMenuOpen(false)}
          >
            Current Weather
          </NavLink>

          <NavLink
            to="/projects/weather/forecast-14d"
            className={({ isActive }) =>
              `text-lg font-semibold tracking-wide transition-all duration-200 py-2 px-4 rounded-lg my-1
               ${
                 isActive
                   ? "text-yellow-400 bg-indigo-800"
                   : "text-white hover:bg-indigo-500"
               }`
            }
            onClick={() => setMenuOpen(false)}
          >
            14D Forecast
          </NavLink>
        </div>

        {/* Spacer to balance the layout on desktop */}
        <div className="hidden sm:block w-24"></div>
      </nav>
    </header>
  );
}

export default WeatherHeader;
