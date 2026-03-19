import React from 'react';
import { Outlet } from 'react-router-dom';
import VideoBackground from './VideoBackground';
import AppSidebar from './AppSidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <VideoBackground />
      <AppSidebar />
      <main className="ml-64 relative z-10 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
