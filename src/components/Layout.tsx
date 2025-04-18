import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
const Layout: React.FC = () => {
  return <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>;
};
export default Layout;