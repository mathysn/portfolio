import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-inter">
      <Navbar />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8">
        <Outlet />
      </main>
      <footer className="w-full px-6 py-4 border-t border-gray-800 bg-gray-900 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
