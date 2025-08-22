import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 text-2xl font-bold">
            <NavLink to="/" className="flex items-center space-x-1">
              <span className="text-cyan-400">we</span>
              <span className="text-white">Code</span>
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-cyan-400 ${
                  isActive ? "text-cyan-400 border-b-2 border-cyan-400" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-cyan-400 ${
                  isActive ? "text-cyan-400 border-b-2 border-cyan-400" : ""
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `hover:text-cyan-400 ${
                  isActive ? "text-cyan-400 border-b-2 border-cyan-400" : ""
                }`
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-cyan-400 ${
                  isActive ? "text-cyan-400 border-b-2 border-cyan-400" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-white hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-lg font-medium bg-blue-800">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-cyan-400  ${
                isActive ? "text-cyan-400 border-cyan-400" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-cyan-400  ${
                isActive ? "text-cyan-400 border-cyan-400" : ""
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/projects"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-cyan-400  ${
                isActive ? "text-cyan-400 border-cyan-400" : ""
              }`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block hover:text-cyan-400  ${
                isActive ? "text-cyan-400 border-cyan-400" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Header;
