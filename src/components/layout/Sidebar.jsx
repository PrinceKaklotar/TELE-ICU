import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  BellRing, 
  ClipboardList, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  HeartPulse
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { alerts, followups } = useApp();

  const unackAlerts = alerts.filter(a => a.status === 'UNACKNOWLEDGED').length;
  const pendingFollowups = followups.filter(f => f.status === 'PENDING').length;

  const navItems = [
    {
      name: 'Overview',
      path: '/',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Patient Monitoring',
      path: '/patients',
      icon: Activity,
      badge: null
    },
    {
      name: 'Alert Center',
      path: '/alerts',
      icon: BellRing,
      badge: unackAlerts > 0 ? unackAlerts : null,
      badgeColor: 'bg-rose-500 text-white'
    },
    {
      name: 'Follow-ups',
      path: '/followups',
      icon: ClipboardList,
      badge: pendingFollowups > 0 ? pendingFollowups : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      name: 'Communication',
      path: '/communication',
      icon: MessageSquare,
      badge: null
    },
    {
      name: 'Reports & Audit',
      path: '/reports',
      icon: BarChart3,
      badge: null
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#14243A] text-slate-300 border-r border-[#243552] select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#243552]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3478E5] to-[#13B8A6] flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>

          {(!collapsed || mobileOpen) && (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider text-white">TELE-ICU</span>
                <span className="px-1.5 py-0.5 bg-blue-500/20 text-[#3478E5] border border-blue-400/30 rounded text-[9px] font-bold">PoC</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#74839A] font-semibold block -mt-0.5">
                Command Center
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <div className={`px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 ${collapsed && !mobileOpen ? 'hidden' : 'block'}`}>
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-[#3478E5] text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
              title={collapsed ? item.name : undefined}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {(!collapsed || mobileOpen) && (
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <span
                      className={`ml-2 px-2 py-0.5 text-[11px] font-bold rounded-full ${
                        item.badgeColor || 'bg-white/10 text-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Compact Simulated Indicator */}
      {(!collapsed || mobileOpen) && (
        <div className="mx-3 mb-3 p-2.5 rounded-xl bg-[#1b2f4a] border border-[#2e476d]/60 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-medium text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Simulated Telemetry</span>
          </div>
          <span className="text-[10px] text-slate-400">8 Beds</span>
        </div>
      )}

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-[#243552] bg-[#0f1d30]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                BS
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-[#14243A]" />
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">Bhavin Shah</p>
                <p className="text-[11px] text-slate-400 truncate">Tele-ICU Nurse</p>
              </div>
            )}
          </div>

          {(!collapsed || mobileOpen) && (
            <NavLink
              to="/settings"
              onClick={() => setMobileOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="System Settings"
              aria-label="System Settings"
            >
              <Settings className="w-4 h-4" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-[250px]'
        }`}
      >
        <div className={`fixed top-0 bottom-0 left-0 transition-all duration-300 ease-in-out z-30 ${
          collapsed ? 'w-20' : 'w-[250px]'
        }`}>
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[270px] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
