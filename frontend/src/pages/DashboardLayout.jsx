import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToolsModal } from '../components/Modals';
import { useState } from 'react';

const DashboardLayout = () => {
  const [showTools, setShowTools] = useState(false);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar toggleTools={() => setShowTools(true)} />
      <ToolsModal isOpen={showTools} onClose={() => setShowTools(false)} />
      <main className="main-content flex-grow-1 container pb-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default DashboardLayout;