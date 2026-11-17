import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, 
  Users, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import KpiGrid from '../components/dashboard/KpiGrid';
import PatientMatrix from '../components/dashboard/PatientMatrix';
import { useApp } from '../context/AppContext';
import { formatTime } from '../utils/helpers';

export default function Overview() {
  const { lastTelemetrySync, patients } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="space-y-5 max-w-7xl mx-auto"
    >
      {/* A. Compact Welcome Section */}
      <div className="rounded-2xl bg-[#14243A] text-white p-5 lg:px-6 lg:py-4.5 border border-[#243552] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-white">
            Good evening, Sarah
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            ICU monitoring overview
          </p>
        </div>

        {/* Small Status Indicators */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-medium flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monitoring Active</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-400/30 text-blue-300 font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>{patients.length} Patients Connected</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-300 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Simulated PoC</span>
          </span>

          <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 pl-2 border-l border-slate-700 font-mono">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{formatTime(lastTelemetrySync)}</span>
          </div>
        </div>
      </div>

      {/* B. KPI Overview: 4 Clean Metric Cards */}
      <KpiGrid />

      {/* C & D. Patient Monitoring Matrix (Centerpiece) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Patient Monitoring Matrix
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {patients.length} beds active
          </span>
        </div>

        <PatientMatrix defaultFilter="ALL" />
      </section>
    </motion.div>
  );
}
