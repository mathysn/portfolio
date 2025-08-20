import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-6 py-4 border-t border-gray-800 bg-gray-900 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Mathys NOURRY
    </footer>
  );
};

export default Footer;
