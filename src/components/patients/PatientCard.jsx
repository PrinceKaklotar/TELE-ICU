import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Wind, ArrowRight, Clock } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';

export default function PatientCard({ patient }) {
  const { setSelectedPatientId } = useApp();
  const { vitals } = patient;

  const isCritical = patient.status === 'CRITICAL';
  const isWarning = patient.status === 'WARNING';
  const isOffline = patient.status === 'OFFLINE';

  // Subtle border accent for visual status recognition
  const borderStyle = isCritical
    ? 'border-rose-300 dark:border-rose-900/80 bg-rose-50/20 dark:bg-rose-950/10'
    : isWarning
    ? 'border-amber-300 dark:border-amber-900/80 bg-amber-50/20 dark:bg-amber-950/10'
    : isOffline
    ? 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/20 opacity-80'
    : 'border-slate-200 dark:border-[#243552] bg-white dark:bg-[#162238]';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.12 }}
      onClick={() => setSelectedPatientId(patient.id)}
      className={`rounded-2xl border ${borderStyle} p-4 sm:p-4.5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-[210px] select-none`}
    >
      {/* Top Section: Name, ID, Bed & Status */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm lg:text-base text-slate-900 dark:text-white leading-tight">
              {patient.name}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>{patient.id}</span>
              <span>•</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{patient.bed}</span>
            </div>
          </div>

          <StatusBadge status={patient.status} size="sm" />
        </div>
      </div>

      {/* Middle Section: Primary Vitals (Heart Rate & SpO2) */}
      <div className="grid grid-cols-2 gap-2.5 py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-[#121c2e] border border-slate-100 dark:border-[#1e2e48]">
        {/* Heart Rate */}
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg shrink-0 ${
            isCritical ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300' :
            isWarning ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300' :
            'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          }`}>
            <Heart className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium block leading-none">Heart Rate</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold font-mono tracking-tight text-slate-900 dark:text-white leading-none">
                {vitals.heartRate}
              </span>
              <span className="text-[10px] text-slate-500 font-normal">bpm</span>
            </div>
          </div>
        </div>

        {/* SpO2 */}
        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-[#1e2e48] pl-2.5">
          <div className={`p-1.5 rounded-lg shrink-0 ${
            typeof vitals.spo2 === 'number' && vitals.spo2 < 90 ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300' :
            typeof vitals.spo2 === 'number' && vitals.spo2 < 94 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300' :
            'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          }`}>
            <Wind className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium block leading-none">SpO2</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-bold font-mono tracking-tight text-slate-900 dark:text-white leading-none">
                {vitals.spo2}
              </span>
              <span className="text-[10px] text-slate-500 font-normal">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: BP, Resp Rate, Last Update, Action */}
      <div className="pt-2 border-t border-slate-100 dark:border-[#243552]">
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-2">
          <div>
            <span className="text-slate-400 text-[11px]">BP: </span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
              {vitals.bpSystolic && vitals.bpDiastolic ? `${vitals.bpSystolic}/${vitals.bpDiastolic}` : '--'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Resp: </span>
            <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
              {vitals.respiratoryRate ? `${vitals.respiratoryRate}/min` : '--'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-100 dark:border-[#243552]/60">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Updated {patient.lastUpdated}</span>
          </div>

          <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
