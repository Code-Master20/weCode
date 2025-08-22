import { Outlet } from "react-router-dom";
import ProjectHeader from "../projects/ProjectHeader";

function Projects() {
  return (
    <>
      <ProjectHeader />
      <Outlet />
    </>
  );
}

export default Projects;
