import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Root from "./Root.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Projects from "./components/Projects-nav.jsx";

import TodoApp from "./projects/TodoApp/TodoApp.jsx";
import AddTodo from "./projects/TodoApp/AddTodo.jsx";
import RemainedTodos from "./projects/TodoApp/RemainedTodos.jsx";
import CompletedTodos from "./projects/TodoApp/CompletedTodos.jsx";
import CurrencySwap from "./projects/CurrencySwap/CurrencySwap.jsx";
import WeatherApp from "./projects/WeatherApp/WeatherApp.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="projects" element={<Projects />}>
          <Route index element={<Navigate to="weather" replace />} />
          <Route path="todo" element={<TodoApp />}>
            <Route index element={<Navigate to="add-todo" replace />} />
            <Route path="add-todo" element={<AddTodo />} />
            <Route path="remains" element={<RemainedTodos />} />
            <Route path="completes" element={<CompletedTodos />} />
          </Route>
          <Route path="currency" element={<CurrencySwap />} />
          <Route path="weather" element={<WeatherApp />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);
