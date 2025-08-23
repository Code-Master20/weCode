import { NavLink } from "react-router-dom";
import { useState } from "react";

function WeatherHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="lg:bg-indigo-700 shadow-md mt-4">
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center sm:justify-around items-center px-4 sm:px-6 py-3 relative">
        {/* Hamburger menu for mobile */}
        <button
          className="sm:hidden absolute left-4 top-2 focus:outline-none z-20 bg-indigo-800 bg-opacity-90 p-2 rounded"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className="block w-7 h-1 bg-yellow-400 mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-yellow-400 mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-yellow-400 rounded"></span>
        </button>

        {/* Nav links */}
        <div
          className={`
            flex-col sm:flex-row gap-3 sm:gap-8 items-center
            ${menuOpen ? "flex" : "hidden"} sm:flex
            bg-indigo-800 bg-opacity-95 sm:bg-indigo-700 sm:bg-opacity-100 sm:static sm:w-auto sm:p-0
            absolute left-0 top-12 w-full z-10
            px-4 py-3
          `}
        >
          <NavLink
            to="/projects/weather/current-weather"
            className={({ isActive }) =>
              `text-base sm:text-lg md:text-xl font-semibold tracking-wide transition-all duration-200 
               ${
                 isActive
                   ? "text-yellow-400 border-b-2 border-yellow-400"
                   : "text-white"
               } 
               hover:text-yellow-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            Current Weather
          </NavLink>

          <NavLink
            to="/projects/weather/forecast-14d"
            className={({ isActive }) =>
              `text-base sm:text-lg md:text-xl font-semibold tracking-wide transition-all duration-200 
               ${
                 isActive
                   ? "text-yellow-400 border-b-2 border-yellow-400"
                   : "text-white"
               } 
               hover:text-yellow-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            14D Forecast
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default WeatherHeader;
