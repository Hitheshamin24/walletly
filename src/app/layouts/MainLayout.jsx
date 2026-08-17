import React from "react";
import Navbar from "../../shared/ui/components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="ml-55 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
