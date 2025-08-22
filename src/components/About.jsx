import sahidurImg from "../assets/sahidurmiah.png";

function About() {
  return (
    <div className="mx-auto px-4 sm:px-8 lg:px-10 py-8 ">
      {/* About Me */}
      <section className="mb-10 md:mb-12 lg:mb-16">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 lg:text-5xl">
          About Me
        </h1>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 items-center">
          <div className="md:w-2/3 order-2 md:order-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 lg:text-4xl">
              Sahidur Miah
            </h1>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-3 sm:mb-4 lg:text-3xl">
              Full-Stack Web Developer
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-2xl">
              I'm a passionate web developer with a strong background in both
              front-end and back-end technologies. I love turning ideas into
              reality through code and am always eager to learn new things.
            </p>
          </div>
          <div className="md:w-1/3 order-1 md:order-2">
            <img
              src={sahidurImg}
              alt="developer-img"
              className="rounded-lg shadow-md w-40 h-40 sm:w-48 sm:h-48 object-cover mx-auto lg:h-[18rem] lg:w-[18rem]"
            />
          </div>
        </div>
        <hr className="border-t border-gray-200 my-6 sm:my-8" />
      </section>

      {/* My Journey */}
      <section className="mb-10 md:mb-12 lg:mb-16">
        <h1 className="text-2xl font-bold mb-3 sm:mb-4 text-gray-800 lg:text-3xl">
          My Journey
        </h1>
        <div className="space-y-3 sm:space-y-4 text-gray-700">
          <p className="leading-relaxed text-sm sm:text-base lg:text-2xl">
            I began my coding journey after completing my 12th grade in the
            science stream. Driven by curiosity and passion for technology, I
            started learning web development on my own, building projects, and
            exploring modern tools and frameworks.
          </p>
          <p className="leading-relaxed text-sm sm:text-base lg:text-2xl">
            I have experience working with popular technologies like{" "}
            <span className="font-medium text-gray-900">
              HTML, CSS, TailwindCSS, ReactJS, NodeJS, ExpressJS, JavaScript
            </span>
            , and more. I enjoy tackling challenging problems and building
            efficient, scalable solutions.
          </p>
        </div>
        <hr className="border-t border-gray-200 my-6 sm:my-8" />
      </section>

      {/* Skills */}
      <section className="mb-10 md:mb-12 lg:mb-16">
        <h1 className="text-2xl font-bold mb-3 sm:mb-4 text-gray-800 lg:text-3xl">
          Skills
        </h1>
        <div className="flex flex-wrap gap-2 sm:gap-3 text-gray-700">
          <span className="font-bold bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
            HTML
          </span>
          <span className="font-bold bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
            CSS
          </span>
          <span className="font-bold bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
            TailwindCSS
          </span>
          <span className="font-bold bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
            JavaScript
          </span>
          <span className="font-bold bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
            ReactJS
          </span>
          <span className="font-bold bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
            NodeJS
          </span>
          <span className="bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs font-bold sm:text-sm">
            ExpressJS
          </span>
          <span className="bg-gray-100 px-2 py-1 font-bold sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
            Git
          </span>
        </div>
        <hr className="border-t border-gray-200 my-6 sm:my-8" />
      </section>

      {/* Experience */}
      <section className="mb-8 sm:mb-10">
        <h1 className="text-2xl font-bold mb-3 sm:mb-4 text-gray-800 lg:text-3xl">
          Experience
        </h1>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-2xl">
          Over the years, I've worked on a range of web projects, from small
          fun-play websites to full-fledged web applications. I'm always looking
          for new opportunities to grow and make an impact.
        </p>
      </section>

      <section className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
        <p className="text-blue-800 font-medium text-sm sm:text-base">
          I'm open to new opportunities - feel free to reach out!
        </p>
      </section>
    </div>
  );
}

export default About;
