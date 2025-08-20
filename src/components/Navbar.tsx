import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-[700px] md:w-[900px] lg:w-[1100px] mx-auto mt-4 rounded-2xl backdrop-blur-xl bg-gray-900/80 border border-gray-800 shadow-2xl flex items-center justify-between px-10 py-4">
        <div onClick={() => navigate('/')} className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 cursor-pointer">Your Name</div>
        <div className="flex space-x-6">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-5 py-2 rounded-lg font-semibold shadow transition
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-gray-900 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                    : 'bg-gray-800/60 text-gray-100 hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-300 hover:to-green-300 hover:text-gray-900 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.25)]'}`}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
