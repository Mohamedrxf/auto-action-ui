import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import AppSidebar from './AppSidebar';

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.25, ease: [0.55, 0.06, 0.68, 0.19] } },
};

const DashboardLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen relative">
      <VideoBackground />
      <AppSidebar />
      <main className="ml-64 relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default DashboardLayout;
