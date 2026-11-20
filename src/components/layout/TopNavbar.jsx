import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  Clock, 
  X,
  Play,
  Pause
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import NotificationDropdown from './NotificationDropdown';
import { formatTime, formatDate } from '../../utils/helpers';

export default function TopNavbar({ setMobileOpen }) {
  const location = useLocation();
  const { 
    theme, 
    toggleTheme, 
    patients, 
    setSelectedPatientId, 
    notifications, 
    simulationState, 
    setSimulationState,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return { title: 'Overview', breadcrumb: 'Command Center' };
      case '/patients':
        return { title: 'Patient Monitoring', breadcrumb: 'Surveillance' };
      case '/alerts':
        return { title: 'Alert Center', breadcrumb: 'Prioritization' };
      case '/followups':
        return { title: 'Follow-ups', breadcrumb: 'Task Board' };
      case '/communication':
        return { title: 'Communication', breadcrumb: 'Tele-Bedside' };
      case '/reports':
        return { title: 'Reports & Audit', breadcrumb: 'Analytics' };
      case '/settings':
        return { title: 'Settings', breadcrumb: 'System' };
      default:
        return { title: 'Tele-ICU Command Center', breadcrumb: 'Dashboard' };
    }
  };

  const { title, breadcrumb } = getPageTitle(location.pathname);
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const filteredPatients = searchQuery.trim() === '' 
    ? [] 
    : patients.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.bed.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSelectSearchPatient = (p) => {
    setSelectedPatientId(p.id);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white dark:bg-[#14243A] border-b border-slate-200 dark:border-[#243552] px-4 lg:px-6 select-none transition-colors">
      <div className="flex items-center justify-between h-full gap-4">
        {/* Left: Mobile hamburger & Clean Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-[#74839A] dark:text-slate-400">
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Tele-ICU
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-600 dark:text-slate-300 truncate">
                {breadcrumb}
              </span>
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-[#17243A] dark:text-white truncate leading-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Center: Global Search */}
        <div className="relative flex-1 max-w-sm hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search patient, ID, or bed..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full pl-9 pr-8 py-2 bg-slate-100 dark:bg-[#1a2d48] border border-transparent dark:border-[#243552] focus:border-blue-500 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchDropdown(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchQuery.trim() !== '' && (
            <div 
              onMouseLeave={() => setShowSearchDropdown(false)}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#162238] rounded-xl shadow-xl border border-slate-200 dark:border-[#243552] overflow-hidden z-50 divide-y divide-slate-100 dark:divide-[#243552]"
            >
              {filteredPatients.length === 0 ? (
                <div className="p-3 text-xs text-center text-slate-500 dark:text-slate-400">
                  No matching patients
                </div>
              ) : (
                filteredPatients.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectSearchPatient(p)}
                    className="p-2.5 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-[#1f3354] cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900 dark:text-white">{p.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{p.id}</span>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{p.bed}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.status === 'CRITICAL' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' :
                      p.status === 'WARNING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                      p.status === 'STABLE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right: Actions, Live Clock, Notifications, Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Simulation Status Badge & Controls */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1a2d48] border border-slate-200 dark:border-[#243552] text-xs">
            <span className={`w-2 h-2 rounded-full ${
              simulationState === 'RUNNING' ? 'bg-emerald-500' :
              simulationState === 'PAUSED' ? 'bg-amber-500' : 'bg-slate-400'
            }`} />
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
              {simulationState === 'RUNNING' ? 'Sim: Active' : simulationState === 'PAUSED' ? 'Sim: Paused' : 'Sim: Stopped'}
            </span>
            <button
              onClick={() => setSimulationState(simulationState === 'RUNNING' ? 'PAUSED' : 'RUNNING')}
              className="ml-1 p-0.5 text-slate-500 hover:text-blue-600 dark:hover:text-white"
              title={simulationState === 'RUNNING' ? "Pause simulation" : "Resume simulation"}
              aria-label={simulationState === 'RUNNING' ? "Pause simulation" : "Resume simulation"}
            >
              {simulationState === 'RUNNING' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
            </button>
          </div>

          {/* Live Date & Time Display */}
          <div className="hidden sm:flex flex-col text-right">
            <div className="flex items-center justify-end gap-1 text-xs font-semibold text-slate-800 dark:text-slate-100 font-mono">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>{formatTime(currentTime)}</span>
            </div>
            <span className="text-[10px] text-slate-400">
              {formatDate(currentTime)}
            </span>
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-[#243552] mx-1 hidden sm:block" />

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a2d48] rounded-xl transition-colors"
            title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Notification Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a2d48] rounded-xl transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-rose-500" />
              )}
            </button>

            <NotificationDropdown
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
            />
          </div>

          {/* User Quick Avatar */}
          <div className="flex items-center pl-1">
            <Link
              to="/settings"
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1a2d48] transition-colors"
              title="Pooja Patel (Tele-ICU Nurse)"
              aria-label="User Profile Settings"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center">
                PP
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
