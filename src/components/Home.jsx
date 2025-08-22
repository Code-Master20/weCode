import sahidurImg from "../assets/sahidurmiah.png";
import html from "../assets/HTML.jpg";
import css from "../assets/CSS.jpg";
import js from "../assets/JS.jpg";
import tailwindcss from "../assets/TAILWINDCSS.jpg";
import reactjs from "../assets/REACTJS.jpg";
import nodejs from "../assets/NODEJS.jpg";
import expressjs from "../assets/EXPRESSJS.jpg";
import ProjectCard from "./ProjectCard";
import WeCodeProvider, {
  useWeCode,
} from "../contexts/currentContexts/WeCodeContext";

function ProjectsSection() {
  const { appsInfo } = useWeCode();

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
      {appsInfo.map((app, index) => (
        <ProjectCard key={index} appInfo={app} alt={`${app.appName}-img`} />
      ))}
    </section>
  );
}

function Home() {
  return (
    <WeCodeProvider>
      <div className="flex flex-col items-center px-6 sm:px-12 lg:px-20">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full py-16 gap-10">
          {/* Text Section */}
          <section className="text-center lg:text-left max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              HI I'M SAHIDUR MIAH
            </h1>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-blue-600 mb-6">
              WEB DEVELOPER
            </h1>
            <p className="text-lg lg:text-4xl text-gray-600 mb-6">
              Building modern and impactful web solutions
            </p>
          </section>

          {/* Image Section */}
          <section>
            <img
              className="w-56 sm:w-[18rem] lg:w-[22rem] drop-shadow-lg"
              src={sahidurImg}
              alt="img"
            />
          </section>
        </div>

        {/* About Section */}
        <div className="w-full py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 lg:text-5xl">
            About Me
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg lg:text-2xl leading-relaxed">
            I am a web developer with a passion for creating sleek and modern
            web applications. I love transforming ideas into reality using the
            latest tech.
          </p>

          {/* Skills Logos */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
            <img className="w-16 sm:w-20 lg:w-24" src={html} alt="html-img" />
            <img className="w-16 sm:w-20 lg:w-24" src={css} alt="css-img" />
            <img
              className="w-16 sm:w-20 lg:w-24"
              src={tailwindcss}
              alt="tailwind-img"
            />
            <img className="w-12 sm:w-15 lg:w-18" src={js} alt="js-img" />
            <img
              className="w-12 sm:w-15 lg:w-18"
              src={reactjs}
              alt="reactjs-img"
            />
            <img
              className="w-16 sm:w-20 lg:w-24"
              src={nodejs}
              alt="nodejs-img"
            />
            <img
              className="w-16 sm:w-20 lg:w-24"
              src={expressjs}
              alt="express-img"
            />
          </div>
        </div>

        {/* Projects Section */}
        <div className="w-full py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6 lg:text-5xl">
            Projects
          </h2>
          <ProjectsSection />
        </div>
      </div>
    </WeCodeProvider>
  );
}

export default Home;
