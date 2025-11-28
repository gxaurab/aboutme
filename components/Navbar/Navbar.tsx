"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "text-fuchsia-400" : "";

  return (
    <nav className="flex p-3 w-full fixed top-0 left-0 items-center justify-around text-white bg-cyan-950 z-50 shadow-lg">
      <Link
        href="/"
        className="text-4xl hover:text-fuchsia-500 sm:text-6xl transition-colors duration-300"
      >
        {"</>"}
      </Link>

      <div className="flex gap-3 font-bitcount sm:text-3xl sm:gap-10 justify-evenly">
        <Link
          href="/projects"
          className={`hover:text-fuchsia-500 transition-colors duration-300 ${isActive(
            "/projects"
          )}`}
        >
          Projects
        </Link>

        <Link
          href="/likes"
          className={`hover:text-fuchsia-500 transition-colors duration-300 ${isActive(
            "/likes"
          )}`}
        >
          Likes
        </Link>

        <Link
          href="/writes"
          className={`hover:text-fuchsia-500 transition-colors duration-300 ${isActive(
            "/writes"
          )}`}
        >
          Writes
        </Link>

        <Link
          href="/contact"
          className={`hover:text-fuchsia-500 transition-colors duration-300 ${isActive(
            "/contact"
          )}`}
        >
          FindMe
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
