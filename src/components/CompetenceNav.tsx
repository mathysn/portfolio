import React from "react";
import { NavLink } from "react-router-dom";

const competenceLinks = [
  { to: "/portfolio/competence1", label: "Compétence 1" },
  { to: "/portfolio/competence2", label: "Compétence 2" },
  { to: "/portfolio/competence6", label: "Compétence 6" },
];

const CompetenceNav: React.FC = () => (
  <nav className="flex flex-col gap-4 p-6 bg-gray-900 rounded-xl min-w-[180px]">
    {competenceLinks.map(link => (
      <NavLink
        key={link.to}
        to={link.to}
        className={({ isActive }) =>
          `px-5 py-2 rounded-lg font-semibold shadow transition bg-gray-800/60 text-gray-100 text-left hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-300 hover:to-green-300 hover:text-gray-900 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.25)] ${
            isActive ? "bg-gradient-to-r from-blue-400 via-cyan-300 to-green-300 text-gray-900 shadow-[0_0_16px_2px_rgba(34,211,238,0.25)]" : ""
          }`
        }
      >
        {link.label}
      </NavLink>
    ))}
  </nav>
);

export default CompetenceNav;
