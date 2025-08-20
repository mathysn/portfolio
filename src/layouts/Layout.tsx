import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-inter">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
