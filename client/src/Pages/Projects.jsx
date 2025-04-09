import { Link } from "react-router-dom";
import CallToAction from "../Component/CallToAction";

function Projects() {
  return (
    <div className="min-h-screen py-20 px-6 flex flex-col justify-center items-center ">
      {/* Header */}
      <div className="w-full max-w-5xl text-center md:text-left mb-12">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-7xl text-gray-600 leading-tight">
          Projects
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-600">
          A collection of projects I’ve worked on — showcasing my skills,
          creativity, and passion for web development.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {[1, 2, 3].map((project, idx) => (
          <div
            key={idx}
            className="bg-gray-400 shadow-md hover:shadow-lg rounded-lg transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-500 mb-2">
                Project {project}
              </h2>
              <p className="text-gray-600 text-base mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, magnam?
              </p>
            </div>
            <Link
              to="#"
              className="text-blue-600 hover:underline mt-auto font-medium"
            >
              View Project →
            </Link>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-20 w-full">
        <CallToAction />
      </div>
    </div>
  );
}

export default Projects;
