import { NavLink } from "react-router-dom";
import { useState } from "react";

function TodoHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="lg:bg-blue-700 shadow-md mt-4">
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center sm:justify-around items-center px-4 sm:px-6 py-3 relative">
        {/* Hamburger menu for mobile */}
        <button
          className="sm:hidden absolute left-4 top-2 focus:outline-none z-20 bg-blue-800 bg-opacity-90 p-2 rounded"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span className="block w-7 h-1 bg-amber-400 mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-amber-400 mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-amber-400 rounded"></span>
        </button>
        {/* Nav links */}
        <div
          className={`
            flex-col sm:flex-row gap-3 sm:gap-8 items-center
            ${menuOpen ? "flex" : "hidden"} sm:flex
            bg-blue-800 bg-opacity-95 sm:bg-blue-700 sm:bg-opacity-100 sm:static sm:w-auto sm:p-0
            absolute left-0 top-12 w-full z-10
            px-4 py-3
          `}
        >
          <NavLink
            to="/projects/todo/add-todo"
            className={({ isActive }) =>
              `text-base sm:text-lg md:text-xl font-semibold tracking-wide transition-all duration-200 
               ${
                 isActive
                   ? "text-amber-400 border-b-2 border-amber-400"
                   : "text-white"
               } 
               hover:text-amber-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            AddTodo
          </NavLink>

          <NavLink
            to="/projects/todo/remains"
            className={({ isActive }) =>
              `text-base sm:text-lg md:text-xl font-semibold tracking-wide transition-all duration-200 
               ${
                 isActive
                   ? "text-amber-400 border-b-2 border-amber-400"
                   : "text-white"
               } 
               hover:text-amber-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            Remains
          </NavLink>

          <NavLink
            to="/projects/todo/completes"
            className={({ isActive }) =>
              `text-base sm:text-lg md:text-xl font-semibold tracking-wide transition-all duration-200 
               ${
                 isActive
                   ? "text-amber-400 border-b-2 border-amber-400"
                   : "text-white"
               } 
               hover:text-amber-300`
            }
            onClick={() => setMenuOpen(false)}
          >
            Completed
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default TodoHeader;
