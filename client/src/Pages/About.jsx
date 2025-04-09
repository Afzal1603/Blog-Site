import CallToAction from "../Component/CallToAction";

function About() {
  return (
    <div className="min-h-screen py-20 px-6 flex flex-col justify-center items-center ">
      {/* Header */}
      <div className="w-full max-w-5xl text-center md:text-left mb-12">
        <h1 className="font-bold text-4xl sm:text-5xl md:text-7xl text-gray-700 leading-tight">
          About Me
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-400">
          I’m Mohd Afzal Ansari — a full-stack web developer and computer
          science student passionate about building impactful web experiences.
        </p>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Who I Am
          </h2>
          <p className="text-base text-gray-400 mb-4">
            I'm currently pursuing my B.Tech in Computer Science at SRMSCET,
            Bareilly. I specialize in building full-stack web applications using
            the MERN stack — MongoDB, Express, React, and Node.js.
          </p>
          <p className="text-base text-gray-500 mb-4">
            My interests span across frontend design, backend logic, RESTful
            APIs, and performance optimization. I'm always up for a challenge,
            whether it’s solving DSA problems or crafting intuitive user
            interfaces.
          </p>
          <p className="text-base text-gray-400">
            Through this blog and my projects, I aim to share my journey,
            contribute to the dev community, and grow with like-minded tech
            enthusiasts.
          </p>
        </div>

        {/* Optional Image or Skill Tags */}
        <div className="bg-slate-700 rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-medium text-slate-400 mb-4">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "Tailwind CSS",
              "JavaScript",
              "Postman",
              "Framer Motion",
              "Axios",
              "Java",
              "Python",
              "C",
            ].map((tech, idx) => (
              <span
                key={idx}
                className="bg-white text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
