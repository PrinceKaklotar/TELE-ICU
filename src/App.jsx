import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import Overview from './pages/Overview';
import PatientMonitoring from './pages/PatientMonitoring';
import AlertCenter from './pages/AlertCenter';
import FollowUps from './pages/FollowUps';
import Communication from './pages/Communication';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Overview />} />
            <Route path="patients" element={<PatientMonitoring />} />
            <Route path="alerts" element={<AlertCenter />} />
            <Route path="followups" element={<FollowUps />} />
            <Route path="communication" element={<Communication />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
