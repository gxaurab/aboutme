"use client"

import { useEffect, useState } from 'react';

const SkillDescription = () => {
  const knows = [
    'React/NextJs', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'CI/CD',
    '(Non)/Relational Databases', 'Firebase', 'TailwindCSS',
    'Python', 'fastAPI', 'TensorFlow', 'YOLO', 'Deep Learning', 'Data Analysis',
  ];

  const building = [
    'NLP/LLM', 'pytorch', 'Research Projects', 'DevOps',
  ];

  const [knowsHighlight, setKnowsHighlight] = useState(0);
  const [buildingHighlight, setBuildingHighlight] = useState(0);

  const colors = ['text-green-500', 'text-red-500', 'text-pink-500', 'text-blue-400', 'text-white'];

  // Separate intervals for each section
  useEffect(() => {
    const knowsInterval = setInterval(() => {
      setKnowsHighlight(prev => (prev + 1) % knows.length);
    }, 700);

    return () => clearInterval(knowsInterval);
  }, [knows.length]);

  useEffect(() => {
    const buildingInterval = setInterval(() => {
      setBuildingHighlight(prev => (prev + 1) % building.length);
    }, 900); // Different speed for variety

    return () => clearInterval(buildingInterval);
  }, [building.length]);

  const renderSkills = (skills:any, highlightIndex:any) => {
    return skills.map((skill:any, index:any) => {
      const isHighlighted = index === highlightIndex;
      const colorClass = colors[index % colors.length];
      
      return (
        <span key={skill} className="inline-block">
          <span
            className={`transition-all duration-300 ${
              isHighlighted 
                ? `${colorClass} transform text-xl font-bold shadow-lg` 
                : 'text-gray-300'
            }`}
          >
            {skill}
          </span>
          {index < skills.length - 1 && (
            <span className="text-gray-500 mx-2">•</span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="bg-cyan-950">
      <div className="flex flex-col items-center justify-center px-4 py-16 gap-12 max-w-4xl mx-auto">
        
        {/* Technologies Section */}
        <div className="text-center w-full">
          <h2 className="text-3xl md:text-4xl text-green-500 font-medium font-bitcount  mb-8">
            Knows
          </h2>
          <p className="font-mono text-lg leading-relaxed">
            {renderSkills(knows, knowsHighlight)}
          </p>
        </div>

        {/* Currently Building Section */}
        <div className="text-center w-full">
          <h2 className="text-3xl md:text-4xl font-bitcount font-medium text-yellow-400 mb-8">
            Learning
          </h2>
          <p className="text-yellow-300 font-mono text-lg leading-relaxed">
            {renderSkills(building, buildingHighlight)}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SkillDescription;