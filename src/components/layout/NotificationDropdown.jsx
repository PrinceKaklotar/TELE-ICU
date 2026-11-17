import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Trash2, AlertOctagon, AlertTriangle, MessageSquare, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function NotificationDropdown({ isOpen, onClose }) {
  const { notifications, markNotificationRead, markAllNotificationsRead, clearNotifications, setSelectedPatientId } = useApp();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNotificationClick = (item) => {
    markNotificationRead(item.id);
    if (item.title.includes('ICU-003')) {
      setSelectedPatientId('ICU-003');
    } else if (item.title.includes('ICU-005')) {
      setSelectedPatientId('ICU-005');
    } else if (item.type === 'info') {
      navigate('/communication');
    } else if (item.type === 'warning') {
      navigate('/followups');
    }
    onClose();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#162238] rounded-xl shadow-2xl border border-slate-200 dark:border-[#243552] overflow-hidden z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-[#243552] bg-slate-50/70 dark:bg-[#121c2e]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-white">Command Center Alerts</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-500 text-white">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={markAllNotificationsRead}
                title="Mark all as read"
                className="p-1 text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Check className="w-4 h-4 inline mr-1" />
                Read all
              </button>
              <button
                onClick={clearNotifications}
                title="Clear all"
                className="p-1 text-slate-400 hover:text-rose-500 transition-colors ml-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-[#243552]">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No active notifications
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-[#1a2942] ${
                    !item.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <div className="mt-0.5">
                    {item.type === 'critical' ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300">
                        <AlertOctagon className="w-3.5 h-3.5" />
                      </span>
                    ) : item.type === 'warning' ? (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs font-semibold ${!item.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2 border-t border-slate-100 dark:border-[#243552] bg-slate-50 dark:bg-[#121c2e] text-center">
            <button
              onClick={() => {
                navigate('/alerts');
                onClose();
              }}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Full Alert Feed &rarr;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
