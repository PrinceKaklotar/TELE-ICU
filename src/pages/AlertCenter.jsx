import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  Clock, 
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AlertFeed from '../components/alerts/AlertFeed';

export default function AlertCenter() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'ALL';

  const { alerts } = useApp();
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    const urlFilter = searchParams.get('filter');
    if (urlFilter) {
      setActiveFilter(urlFilter.toUpperCase());
    }
  }, [searchParams]);

  // Summary Metrics
  const criticalCount = alerts.filter(a => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length;
  const warningCount = alerts.filter(a => a.severity === 'WARNING' && a.status !== 'RESOLVED').length;
  const infoCount = alerts.filter(a => a.severity === 'INFORMATION' && a.status !== 'RESOLVED').length;
  const unackCount = alerts.filter(a => a.status === 'UNACKNOWLEDGED').length;

  // Filter & prioritize alerts: CRITICAL first, then WARNING, then INFO
  const filteredAlerts = useMemo(() => {
    return alerts
      .filter(a => {
        if (activeFilter === 'ALL') return true;
        if (activeFilter === 'CRITICAL') return a.severity === 'CRITICAL';
        if (activeFilter === 'WARNING') return a.severity === 'WARNING';
        if (activeFilter === 'INFORMATION') return a.severity === 'INFORMATION';
        if (activeFilter === 'UNACKNOWLEDGED') return a.status === 'UNACKNOWLEDGED';
        if (activeFilter === 'ACKNOWLEDGED') return a.status === 'ACKNOWLEDGED';
        return true;
      })
      .sort((a, b) => {
        const priorityOrder = { CRITICAL: 1, WARNING: 2, INFORMATION: 3 };
        const statusOrder = { UNACKNOWLEDGED: 1, ACKNOWLEDGED: 2, RESOLVED: 3 };

        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return priorityOrder[a.severity] - priorityOrder[b.severity];
      });
  }, [alerts, activeFilter]);

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
            Alert Prioritization Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Identify critical events and review pending alarms.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#121c2e] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#243552]">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Acknowledging documents clinical review</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveFilter('CRITICAL')}
          className={`p-3.5 rounded-2xl bg-white dark:bg-[#162238] border ${
            activeFilter === 'CRITICAL' ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 dark:border-[#243552]'
          } shadow-sm cursor-pointer transition-all`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-xs">Critical Alerts</span>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-1.5 text-2xl font-black font-mono text-rose-600 dark:text-rose-400">
            {String(criticalCount).padStart(2, '0')}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Urgent triage</p>
        </div>

        <div
          onClick={() => setActiveFilter('WARNING')}
          className={`p-3.5 rounded-2xl bg-white dark:bg-[#162238] border ${
            activeFilter === 'WARNING' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200 dark:border-[#243552]'
          } shadow-sm cursor-pointer transition-all`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-xs">Warning Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-1.5 text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
            {String(warningCount).padStart(2, '0')}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Threshold alerts</p>
        </div>

        <div
          onClick={() => setActiveFilter('INFORMATION')}
          className={`p-3.5 rounded-2xl bg-white dark:bg-[#162238] border ${
            activeFilter === 'INFORMATION' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 dark:border-[#243552]'
          } shadow-sm cursor-pointer transition-all`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-xs">Information</span>
            <Info className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-1.5 text-2xl font-black font-mono text-blue-600 dark:text-blue-400">
            {String(infoCount).padStart(2, '0')}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">System & leads</p>
        </div>

        <div
          onClick={() => setActiveFilter('UNACKNOWLEDGED')}
          className={`p-3.5 rounded-2xl bg-white dark:bg-[#162238] border ${
            activeFilter === 'UNACKNOWLEDGED' ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 dark:border-[#243552]'
          } shadow-sm cursor-pointer transition-all`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-xs">Unacknowledged</span>
            <Clock className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-1.5 text-2xl font-black font-mono text-rose-600 dark:text-rose-400">
            {String(unackCount).padStart(2, '0')}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Pending review</p>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="p-2.5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'ALL', label: 'All Alerts', count: alerts.length },
            { id: 'CRITICAL', label: 'Critical', count: alerts.filter(a => a.severity === 'CRITICAL').length },
            { id: 'WARNING', label: 'Warning', count: alerts.filter(a => a.severity === 'WARNING').length },
            { id: 'INFORMATION', label: 'Information', count: alerts.filter(a => a.severity === 'INFORMATION').length },
            { id: 'UNACKNOWLEDGED', label: 'Unreviewed', count: unackCount },
            { id: 'ACKNOWLEDGED', label: 'Reviewed', count: alerts.filter(a => a.status === 'ACKNOWLEDGED').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-[#121c2e] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#1e2e48]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === tab.id ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-medium shrink-0 pr-1">
          {filteredAlerts.length} alerts
        </div>
      </div>

      {/* Prioritized Alert Feed */}
      <AlertFeed alerts={filteredAlerts} />
    </motion.div>
  );
}
