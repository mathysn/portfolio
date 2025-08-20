import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sectionLinks = [
  { name: "A propos", section: "next-area" },
  { name: "Entreprise", section: "entreprise-area" },
  { name: "Compétences", section: "competences-area" },
  { name: "Projets", section: "projets-area" },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-[700px] md:w-[900px] lg:w-[1100px] mx-auto mt-4 rounded-2xl backdrop-blur-xl bg-gray-900/80 border border-gray-800 shadow-2xl flex items-center justify-between px-10 py-4">
        <div
          onClick={() => {
            if (location.pathname !== '/portfolio/') {
              navigate('/portfolio/');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 cursor-pointer"
        >
          Mathys NOURRY
        </div>
        <div className="flex space-x-6">
          {sectionLinks.map(link => (
            <button
              key={link.section}
              onClick={() => {
                if (location.pathname !== '/portfolio/') {
                  navigate('/portfolio/');
                  setTimeout(() => {
                    if (link.section) {
                      const el = document.getElementById(link.section);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                } else {
                  if (link.section) {
                    const el = document.getElementById(link.section);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              className={`px-5 py-2 rounded-lg font-semibold shadow transition bg-gray-800/60 text-gray-100 hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-300 hover:to-green-300 hover:text-gray-900 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.25)]`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
