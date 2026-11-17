import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertOctagon, AlertTriangle, ClipboardList, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function KpiGrid() {
  const navigate = useNavigate();
  const { patients, alerts, followups } = useApp();

  const totalPatients = patients.length;
  const criticalAlerts = alerts.filter(a => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length;
  const warningAlerts = alerts.filter(a => a.severity === 'WARNING' && a.status !== 'RESOLVED').length;
  const pendingFollowups = followups.filter(f => f.status === 'PENDING').length;

  const kpis = [
    {
      id: 'kpi-patients',
      label: 'Total Patients',
      value: String(totalPatients).padStart(2, '0'),
      statusText: 'All beds active',
      icon: Users,
      accentBorder: 'border-l-blue-500',
      iconClass: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
      actionLabel: 'View Patients',
      link: '/patients',
    },
    {
      id: 'kpi-critical',
      label: 'Critical Alerts',
      value: String(criticalAlerts).padStart(2, '0'),
      statusText: 'Require review',
      alertStatus: true,
      icon: AlertOctagon,
      accentBorder: 'border-l-rose-500',
      iconClass: 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300',
      actionLabel: 'View Alerts',
      link: '/alerts?filter=CRITICAL',
    },
    {
      id: 'kpi-warning',
      label: 'Warning Alerts',
      value: String(warningAlerts).padStart(2, '0'),
      statusText: 'Excursion alerts',
      icon: AlertTriangle,
      accentBorder: 'border-l-amber-500',
      iconClass: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
      actionLabel: 'View Alerts',
      link: '/alerts?filter=WARNING',
    },
    {
      id: 'kpi-followups',
      label: 'Pending Follow-ups',
      value: String(pendingFollowups).padStart(2, '0'),
      statusText: 'Assigned to nurses',
      icon: ClipboardList,
      accentBorder: 'border-l-teal-500',
      iconClass: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300',
      actionLabel: 'View Board',
      link: '/followups',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            onClick={() => navigate(kpi.link)}
            className={`group p-4 lg:p-5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] border-l-4 ${kpi.accentBorder} shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {kpi.label}
                </span>
                <div className={`p-1.5 rounded-lg ${kpi.iconClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
                  {kpi.value}
                </span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  kpi.alertStatus 
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' 
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {kpi.statusText}
                </span>
              </div>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-[#243552] flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
              <span>{kpi.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
