import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

export default function VitalsMetricCard({ label, value, unit, prevValue, icon: Icon, colorClass, status = 'normal' }) {
  const getTrendIcon = () => {
    if (!prevValue || prevValue === '--' || value === '--') {
      return <Minus className="w-3 h-3 text-slate-400" />;
    }
    const numVal = parseFloat(value);
    const numPrev = parseFloat(prevValue);

    if (isNaN(numVal) || isNaN(numPrev) || numVal === numPrev) {
      return <Minus className="w-3 h-3 text-slate-400" />;
    }
    if (numVal > numPrev) {
      return <ArrowUp className="w-3 h-3 text-rose-500" />;
    }
    return <ArrowDown className="w-3 h-3 text-emerald-500" />;
  };

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold uppercase tracking-wider text-[11px]">{label}</span>
        <div className={`p-1.5 rounded-lg ${colorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="my-2 flex items-baseline gap-1.5">
        <span className="text-2xl lg:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
        <span className="text-xs font-semibold text-slate-400">{unit}</span>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#243552] text-[11px] text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          {getTrendIcon()}
          <span>Prev: {prevValue || '--'}</span>
        </span>
        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
          status === 'critical' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300' :
          status === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300' :
          'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
}
