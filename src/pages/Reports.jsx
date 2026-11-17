import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileSpreadsheet,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { exportToCSV } from '../utils/exportCSV';

export default function Reports() {
  const { patients, alerts, followups, activities } = useApp();
  const [showAllActivities, setShowAllActivities] = useState(false);

  // 1. Alerts by Severity Donut
  const alertSeverityData = useMemo(() => {
    const crit = alerts.filter(a => a.severity === 'CRITICAL').length;
    const warn = alerts.filter(a => a.severity === 'WARNING').length;
    const info = alerts.filter(a => a.severity === 'INFORMATION').length;
    return [
      { name: 'Critical', value: crit, color: '#E5485D' },
      { name: 'Warning', value: warn, color: '#EFA72F' },
      { name: 'Information', value: info, color: '#3478E5' },
    ];
  }, [alerts]);

  // 2. Patient Status Distribution Donut
  const patientStatusData = useMemo(() => {
    const stable = patients.filter(p => p.status === 'STABLE').length;
    const warn = patients.filter(p => p.status === 'WARNING').length;
    const crit = patients.filter(p => p.status === 'CRITICAL').length;
    const off = patients.filter(p => p.status === 'OFFLINE').length;
    return [
      { name: 'Stable', value: stable, color: '#16A36A' },
      { name: 'Warning', value: warn, color: '#EFA72F' },
      { name: 'Critical', value: crit, color: '#E5485D' },
      { name: 'Offline', value: off, color: '#8A96A8' },
    ];
  }, [patients]);

  // 3. Alert Activity Over Time (Hourly trend)
  const hourlyAlertTrend = useMemo(() => {
    return [
      { hour: '18:00', critical: 0, warning: 1, info: 2 },
      { hour: '19:00', critical: 1, warning: 2, info: 1 },
      { hour: '20:00', critical: 1, warning: 1, info: 3 },
      { hour: '21:00', critical: 2, warning: 3, info: 2 },
      { hour: '22:00', critical: 3, warning: 2, info: 4 },
      { hour: '23:00', critical: 2, warning: 3, info: 2 },
    ];
  }, []);

  // Filtered important metrics as explicitly requested by user:
  const totalAlerts = alerts.length;
  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL').length;
  const acknowledgedAlerts = alerts.filter(a => a.status === 'ACKNOWLEDGED' || a.status === 'RESOLVED').length;
  const pendingFollowups = followups.filter(f => f.status === 'PENDING').length;
  const completedFollowups = followups.filter(f => f.status === 'COMPLETED').length;

  const handleExportAlertsCSV = () => {
    const headers = [
      { label: 'Alert ID', key: 'id' },
      { label: 'Patient ID', key: 'patientId' },
      { label: 'Patient Name', key: 'patientName' },
      { label: 'Bed', key: 'bed' },
      { label: 'Type', key: 'type' },
      { label: 'Severity', key: 'severity' },
      { label: 'Status', key: 'status' },
      { label: 'Generated At', key: 'timeGenerated' },
      { label: 'Assigned RN', key: 'assignedTo' },
    ];
    exportToCSV('tele_icu_alerts_log', alerts, headers);
  };

  const handleExportActivitiesCSV = () => {
    const headers = [
      { label: 'Event ID', key: 'id' },
      { label: 'Time', key: 'timestamp' },
      { label: 'Type', key: 'type' },
      { label: 'Patient', key: 'patientName' },
      { label: 'Description', key: 'description' },
      { label: 'Actor', key: 'actor' },
    ];
    exportToCSV('tele_icu_audit_trail', activities, headers);
  };

  const displayedActivities = showAllActivities ? activities : activities.slice(0, 5);

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
            Reports & Audit Logs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Operational summary and shift activity records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportAlertsCSV}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1f3354] border border-slate-200 dark:border-[#243552] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#273e66] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-blue-500" />
            <span>Alerts CSV</span>
          </button>

          <button
            onClick={handleExportActivitiesCSV}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Audit Trail CSV</span>
          </button>
        </div>
      </div>

      {/* 5 Core Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: 'Total Alerts', value: totalAlerts, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Critical Alerts', value: criticalAlerts, color: 'text-rose-600 dark:text-rose-400' },
          { label: 'Reviewed Alerts', value: acknowledgedAlerts, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Pending Follow-ups', value: pendingFollowups, color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Completed Follow-ups', value: completedFollowups, color: 'text-emerald-600 dark:text-emerald-400' },
        ].map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] text-center shadow-sm">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block truncate">
              {item.label}
            </span>
            <span className={`text-2xl font-black font-mono mt-1 block ${item.color}`}>
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>

      {/* Clean 2-Column Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1: Alerts by Severity */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Alerts by Severity
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertSeverityData}
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {alertSeverityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2 rounded shadow text-xs">
                          {payload[0].name}: {payload[0].value} alerts
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Patient Acuity Distribution */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Patient Status Distribution
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={patientStatusData}
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {patientStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-2 rounded shadow text-xs">
                          {payload[0].name}: {payload[0].value} beds
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hourly Trend Chart */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Alert Frequency Trend (Hourly)
        </h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyAlertTrend} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#8A96A8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#8A96A8' }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-2 rounded shadow text-xs space-y-0.5">
                        <p className="font-mono text-slate-400">{label}</p>
                        <p className="text-rose-400">Critical: {payload.find(p => p.dataKey === 'critical')?.value || 0}</p>
                        <p className="text-amber-400">Warning: {payload.find(p => p.dataKey === 'warning')?.value || 0}</p>
                        <p className="text-blue-400">Info: {payload.find(p => p.dataKey === 'info')?.value || 0}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="critical" stroke="#E5485D" fill="#E5485D" fillOpacity={0.2} stackId="1" />
              <Area type="monotone" dataKey="warning" stroke="#EFA72F" fill="#EFA72F" fillOpacity={0.2} stackId="1" />
              <Area type="monotone" dataKey="info" stroke="#3478E5" fill="#3478E5" fillOpacity={0.2} stackId="1" />
              <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Short Activity Timeline with Expand Toggle */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Shift Activity Log
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {activities.length} Recorded Events
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-[#243552]">
          {displayedActivities.map((act) => (
            <div key={act.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="font-mono text-[11px] text-slate-400 shrink-0 mt-0.5">
                  {act.timestamp}
                </span>
                <div className="min-w-0">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 mr-1.5">
                    {act.type.replace('_', ' ')}:
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {act.description}
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 shrink-0">
                {act.actor.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>

        {activities.length > 5 && (
          <div className="pt-3 border-t border-slate-100 dark:border-[#243552] text-center">
            <button
              onClick={() => setShowAllActivities(!showAllActivities)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>{showAllActivities ? 'Show Fewer Events' : `View All ${activities.length} Events`}</span>
              {showAllActivities ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
