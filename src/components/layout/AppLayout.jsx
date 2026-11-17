import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import ToastContainer from '../common/ToastContainer';
import PatientDetailDrawer from '../patients/PatientDetailDrawer';
import TaskModal from '../followups/TaskModal';
import AddNoteModal from '../patients/AddNoteModal';
import AlertResolutionModal from '../alerts/AlertResolutionModal';
import { useApp } from '../../context/AppContext';

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const {
    taskModalContext,
    setTaskModalContext,
    createTask,
    addNoteModalPatient,
    setAddNoteModalPatient,
    resolvingAlert,
    setResolvingAlert,
    resolveAlert
  } = useApp();

  return (
    <div className="flex h-screen bg-[#F3F6FB] dark:bg-[#0B132B] overflow-hidden text-[#17243A] dark:text-[#F1F5F9] font-sans">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar setMobileOpen={setMobileSidebarOpen} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 py-5 lg:px-8 lg:py-6">
          <Outlet />
        </main>
      </div>

      {/* Global Patient Detail Drawer (Right slide-over) */}
      <PatientDetailDrawer />

      {/* Global Quick Task Creation Modal */}
      <TaskModal
        isOpen={Boolean(taskModalContext)}
        onClose={() => setTaskModalContext(null)}
        initialData={taskModalContext || {}}
        onSubmit={(taskData) => {
          createTask(taskData);
          setTaskModalContext(null);
        }}
      />

      {/* Global Add Clinical Note Modal */}
      <AddNoteModal
        isOpen={Boolean(addNoteModalPatient)}
        onClose={() => setAddNoteModalPatient(null)}
        patient={addNoteModalPatient}
      />

      {/* Global Alert Resolution Modal */}
      <AlertResolutionModal
        isOpen={Boolean(resolvingAlert)}
        onClose={() => setResolvingAlert(null)}
        alert={resolvingAlert}
        onConfirm={(notes) => {
          if (resolvingAlert) {
            resolveAlert(resolvingAlert.id, notes);
            setResolvingAlert(null);
          }
        }}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
