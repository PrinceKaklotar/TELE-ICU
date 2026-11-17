import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Eye, 
  ClipboardList, 
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AlertFeed({ alerts }) {
  const { 
    acknowledgeAlert, 
    setSelectedPatientId, 
    setTaskModalContext, 
    setResolvingAlert 
  } = useApp();

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          strip: 'bg-rose-500',
          badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900',
          icon: AlertOctagon,
          border: 'border-rose-200 dark:border-rose-900/60'
        };
      case 'WARNING':
        return {
          strip: 'bg-amber-500',
          badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900',
          icon: AlertTriangle,
          border: 'border-amber-200 dark:border-amber-900/60'
        };
      case 'INFORMATION':
      default:
        return {
          strip: 'bg-blue-500',
          badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900',
          icon: Info,
          border: 'border-blue-200 dark:border-blue-900/60'
        };
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="p-10 text-center bg-white dark:bg-[#162238] rounded-2xl border border-slate-200 dark:border-[#243552]">
        <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
        <h3 className="text-sm font-bold text-slate-800 dark:text-white">
          No alerts in this category
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          All monitored beds within standard parameters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const style = getSeverityStyle(alert.severity);
        const Icon = style.icon;
        const isUnack = alert.status === 'UNACKNOWLEDGED';
        const isAck = alert.status === 'ACKNOWLEDGED';
        const isResolved = alert.status === 'RESOLVED';

        // Extract one concise sentence from description
        const shortDesc = alert.description.split('.')[0] + '.';

        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12 }}
            className={`rounded-2xl bg-white dark:bg-[#162238] border ${
              isUnack ? `${style.border} border-l-4` : 'border-slate-200 dark:border-[#243552] border-l-4 border-l-slate-300 dark:border-l-slate-700'
            } p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
          >
            {/* Left: Indicator, Title, Patient context & Short description */}
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                alert.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300' :
                alert.severity === 'WARNING' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300' :
                'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300'
              }`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="min-w-0 flex-1">
                {/* Top line: Severity badge, Alert title, Patient Name & Bed */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${style.badge}`}>
                    {alert.severity}
                  </span>

                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {alert.type}
                  </span>

                  <span className="text-slate-300 dark:text-slate-700">|</span>

                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {alert.patientName}
                  </span>

                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-medium">
                    {alert.patientId} • {alert.bed}
                  </span>
                </div>

                {/* Short description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {shortDesc}
                </p>

                {/* Sub-line: Time & Assigned Nurse */}
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                  <span>{alert.timeGenerated}</span>
                  <span>•</span>
                  <span>Nurse: {alert.assignedTo}</span>
                  {alert.acknowledgedBy && (
                    <>
                      <span>•</span>
                      <span className="text-slate-500">Reviewed by {alert.acknowledgedBy.split(' ')[0]}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Status & Action buttons */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full mr-1 ${
                isUnack ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' :
                isAck ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' :
                'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              }`}>
                {alert.status === 'UNACKNOWLEDGED' ? 'Unreviewed' : alert.status === 'ACKNOWLEDGED' ? 'Reviewed' : 'Resolved'}
              </span>

              {/* View Patient */}
              <button
                onClick={() => setSelectedPatientId(alert.patientId)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                title="View Patient"
              >
                <Eye className="w-3.5 h-3.5 inline mr-1" />
                <span>Patient</span>
              </button>

              {/* Create Follow-up */}
              <button
                onClick={() => setTaskModalContext({
                  patientId: alert.patientId,
                  patientName: alert.patientName,
                  prefillDesc: `Escalation for ${alert.type} (${alert.id}).`
                })}
                className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-medium transition-colors"
                title="Create Follow-up"
              >
                <ClipboardList className="w-3.5 h-3.5 inline mr-1" />
                <span>Follow-up</span>
              </button>

              {/* Acknowledge Action */}
              {isUnack && (
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                  title="Acknowledge Alert"
                >
                  <Check className="w-3.5 h-3.5 inline mr-1" />
                  <span>Acknowledge</span>
                </button>
              )}

              {/* Resolve Action */}
              {!isResolved && (
                <button
                  onClick={() => setResolvingAlert(alert)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-medium transition-colors"
                  title="Mark Resolved"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />
                  <span>Resolve</span>
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
