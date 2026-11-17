import React from 'react';
import { motion } from 'framer-motion';
import PatientMatrix from '../components/dashboard/PatientMatrix';
import { useApp } from '../context/AppContext';

export default function PatientMonitoring() {
  const { patients } = useApp();

  const criticalCount = patients.filter(p => p.status === 'CRITICAL').length;
  const warningCount = patients.filter(p => p.status === 'WARNING').length;
  const stableCount = patients.filter(p => p.status === 'STABLE').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="space-y-4 max-w-7xl mx-auto"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 lg:p-5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Patient Telemetry Monitoring
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Continuous surveillance across all 8 monitored ICU beds.
          </p>
        </div>

        {/* Quick Severity Summary Chips */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>{criticalCount} Critical</span>
          </span>

          <span className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>{warningCount} Warning</span>
          </span>

          <span className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{stableCount} Stable</span>
          </span>
        </div>
      </div>

      {/* Main Patient Matrix */}
      <PatientMatrix defaultFilter="ALL" />
    </motion.div>
  );
}
