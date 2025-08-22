import { NavLink } from "react-router-dom";

function ProjectHeader() {
  return (
    <nav className="bg-blue-800 text-white shadow-md sticky top-16 z-40">
      <div
        className="
          w-full 
          md:w-4/5    /* 80% width on medium+ screens */
          mx-auto 
          px-4 sm:px-6 lg:px-8
        "
      >
        <div className="flex items-center justify-around h-14 text-lg font-medium">
          <NavLink
            to="/projects/todo"
            className={({ isActive }) =>
              `hover:text-cyan-400 ${
                isActive ? "text-cyan-400 border-b-2 border-cyan-400" : ""
              }`
            }
          >
            TodoApp
          </NavLink>

          <NavLink
            to="/projects/weather"
            className={({ isActive }) =>
              `hover:text-cyan-400 ${
                isActive ? "text-cyan-400 border-b-2 border-cyan-400" : ""
              }`
            }
          >
            WeatherApp
          </NavLink>

          <NavLink
            to="/projects/currency"
            className={({ isActive }) =>
              `hover:text-cyan-400 ${
                isActive ? "text-cyan-400 border-b-2 border-cyan-400" : ""
              }`
            }
          >
            Currency-Swap
          </NavLink>

          {/* Future project NavLinks go here */}
        </div>
      </div>
    </nav>
  );
}

export default ProjectHeader;
