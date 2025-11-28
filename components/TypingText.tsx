"use client"
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingText = () => {
  const [textColorClass, setTextColorClass] = useState('text-cyan-400');
  
  return (
    <div className="text-white text-xl sm:text-2xl font-mono">
      <span className="text-green-500">-$whoami</span>{' '}
      <span className={textColorClass}>
        <TypeAnimation
          sequence={[
            () => setTextColorClass('text-red-400'),
            'A full-stack developer', 2000,
            () => setTextColorClass('text-purple-400'),
            'Interests AI, Deep Learning & Computer Vision', 2000,
            () => setTextColorClass('text-white'),
            "DevOps, Linux Enthusiast", 2000,
            () => setTextColorClass('text-yellow-400'),
            'Fond of guitar instrumentals', 2000,
            () => setTextColorClass('text-pink-400'),
            "Let's Do Some Real World Problem Solving Projects", 2000,
          ]}
          wrapper="span"
          speed={50}
          deletionSpeed={25}
          repeat={Infinity}
          cursor={true}
          preRenderFirstString={false}
        />
      </span>
    </div>
  );
};

export default TypingText;