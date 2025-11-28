import { projectsList, type projTypes } from "./Projects";

const ProjectsDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 space-y-6">
      <div className="max-w-4xl text-center space-y-4">
        <h1 className="text-3xl font-semibold text-pink-400">
          What kind of projects do I build?
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          I love building real-world problem-solving projects — the kind that help people, not
          just showcase technology. I’m driven to create free, open platforms that address issues
          like environmental change, agriculture, unemployment, illiteracy, poverty, and helping
          underprivileged children.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {projectsList.map((project: projTypes, index: number) => (
          <div
            key={index}
            className="border border-pink-400/50 rounded-xl p-4 hover:border-pink-400 shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all"
          >
            <h2 className="text-2xl font-medium text-pink-300 mb-2">{project.title}</h2>
            <p className="text-gray-300 mb-3">{project.description}</p>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-pink-500/80 hover:bg-pink-500 text-white px-4 py-2 rounded-md transition-all"
              >
                Visit Project
              </a>
            ) : (
              <span className="text-gray-500 italic">...</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsDisplay;
