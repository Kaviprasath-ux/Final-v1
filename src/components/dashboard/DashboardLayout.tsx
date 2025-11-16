import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { DashboardProvider } from '../../contexts/DashboardContext';
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import styles from './DashboardLayout.module.css';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardProvider>
      <div className={styles.dashboardLayout}>
        <DashboardHeader />

        <div className={styles.mainContainer}>
          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Sidebar */}
          <div className={`${styles.sidebarContainer} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
            <DashboardSidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Backdrop for mobile */}
          {sidebarOpen && (
            <div
              className={styles.backdrop}
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className={styles.mainContent}>
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};
