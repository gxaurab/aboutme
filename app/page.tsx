"use client";

import Image from "next/image";
import BlogButtonn from "@/components/BlogButtonn";
import Jokes from "../components/Jokes";
import SkillDescription from "../components/SkillDescription";
import TypingText from "../components/TypingText";
import { useJokes } from "../hooks/useJokes";
import { FaLinkedin, FaGithub, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Chat from "@/components/chatComponent/chat";

const Home = () => {
  const { joke, loading, showJoke, handleToggle, ReFetchJoke } = useJokes();

  return (
    <div className="min-h-screen bg-cyan-950 pt-20">
      <div className="flex flex-col items-center justify-center px-4 py-8 gap-5 max-w-4xl mx-auto">

        {/* PROFILE IMAGE */}
        <div className="shrink-0">
          <Image
            src="/meHomePhoto.webp"
            alt="Cover picture"
            width={400}
            height={400}
            priority
            className="m-5 h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover rounded-lg shadow-xl border border-yellow-300/80 hover:border-fuchsia-400 transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/20"
          />
        </div>

        {/* TYPING TEXT */}
        <div className="text-center">
          <TypingText />
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 sm:gap-6 mt-4">
          <a href="https://www.linkedin.com/in/gaurab-wagle-35a402229" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110">
            <FaLinkedin size={28} />
          </a>
          <a href="https://github.com/gxaurab" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110">
            <FaGithub size={28} />
          </a>
          <a href="https://x.com/Gxaurab" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110">
            <FaTwitter size={28} />
          </a>
          <a href="https://www.youtube.com/@windx805" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110">
            <FaYoutube size={28} />
          </a>
          <a href="https://instagram.com/gxaurab" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110">
            <FaInstagram size={28} />
          </a>
        </div>

        <p className="text-white font-sans">oe.gaurav@gmail.com</p>

        {/* JOKE SECTION */}
        <div className="pt-2 text-center max-w-md">
          {showJoke ? (
            <div className="space-y-4">
              <Jokes joke={joke} loading={loading} />
              <button
                onClick={ReFetchJoke}
                className="bg-green-600 px-4 py-2 font-mono text-sm sm:text-base text-yellow-200 hover:bg-red-400 rounded-md transition-colors duration-300 transform hover:scale-105"
              >
                Get New Joke
              </button>
            </div>
          ) : (
            <button
              onClick={handleToggle}
              disabled={loading}
              className="bg-green-700 px-4 py-2 font-mono text-sm sm:text-base text-yellow-200 hover:bg-green-500 rounded-md transition-colors duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Get Jokes!"}
            </button>
          )}
        </div>
      </div>

      <div className="text-center">
        <BlogButtonn text="View Blogs" />
      </div>
      <Chat/>

      <SkillDescription />
    </div>
  );
};

export default Home;
