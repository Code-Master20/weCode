import { NavLink } from "react-router-dom";

function TodoHeader() {
  return (
    <header className="bg-blue-700 shadow-md mt-4">
      {/* 👆 mt-4 keeps it slightly down from the top */}
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-8 justify-center sm:justify-around items-center px-4 sm:px-6 py-3">
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
        >
          Completed
        </NavLink>
      </nav>
    </header>
  );
}

export default TodoHeader;
