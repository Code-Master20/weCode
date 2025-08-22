import { useNavigate } from "react-router-dom";

function ProjectCard({ appInfo, alt }) {
  const navigate = useNavigate();
  const { appName, appDescription, appImg, navigation } = appInfo;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
      <section>
        {appImg && (
          <img
            src={appImg}
            alt={alt}
            className="w-96 h-96 object-contain mb-1"
          />
        )}
      </section>
      <section>
        <span className="text-xl font-semibold text-gray-800 block mb-2">
          {appName}
        </span>
        <p className="text-gray-600 text-2xl mb-4">{appDescription}</p>
      </section>
      <section>
        <button
          onClick={() => navigate(navigation)}
          className="px-5 py-2 rounded-xl cursor-pointer bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition duration-300"
        >
          View More
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;
