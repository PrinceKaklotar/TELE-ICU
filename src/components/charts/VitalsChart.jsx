import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { generateVitalsHistory } from '../../data/patients';
import { Heart, Wind, Gauge } from 'lucide-react';

export default function VitalsChart({ patientId, patientStatus }) {
  const [activeTab, setActiveTab] = useState('heartRate'); // heartRate | spo2 | bp
  const [timeRange, setTimeRange] = useState('1h'); // 15m | 1h | 6h

  const chartData = useMemo(() => {
    return generateVitalsHistory(patientId, timeRange);
  }, [patientId, timeRange]);

  const config = {
    heartRate: {
      label: 'Heart Rate',
      dataKey: 'heartRate',
      stroke: '#E5485D',
      fill: 'rgba(229, 72, 93, 0.15)',
      unit: 'bpm',
      domain: [40, 160],
      threshold: 120,
      thresholdLabel: 'Tachycardia (120 bpm)',
      icon: Heart
    },
    spo2: {
      label: 'Oxygen Saturation (SpO2)',
      dataKey: 'spo2',
      stroke: '#3478E5',
      fill: 'rgba(52, 120, 229, 0.15)',
      unit: '%',
      domain: [80, 100],
      threshold: 92,
      thresholdLabel: 'Hypoxemia Cutoff (92%)',
      icon: Wind
    },
    bp: {
      label: 'Blood Pressure (Systolic)',
      dataKey: 'bpSystolic',
      stroke: '#13B8A6',
      fill: 'rgba(19, 184, 166, 0.15)',
      unit: 'mmHg',
      domain: [60, 180],
      threshold: 90,
      thresholdLabel: 'Hypotension Cutoff (90 mmHg)',
      icon: Gauge
    }
  }[activeTab];

  if (patientStatus === 'OFFLINE') {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#121c2e] rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Telemetry Signal Inactive (Offline)
        </p>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">
          Patient is unhooked during transport to diagnostic imaging. Waveform monitoring will resume upon re-docking.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chart Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Metric Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#121c2e] rounded-xl border border-slate-200 dark:border-[#243552] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('heartRate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'heartRate'
                ? 'bg-white dark:bg-[#1f3354] text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Heart Rate</span>
          </button>

          <button
            onClick={() => setActiveTab('spo2')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'spo2'
                ? 'bg-white dark:bg-[#1f3354] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>SpO2</span>
          </button>

          <button
            onClick={() => setActiveTab('bp')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'bp'
                ? 'bg-white dark:bg-[#1f3354] text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Blood Pressure</span>
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#121c2e] rounded-xl border border-slate-200 dark:border-[#243552] text-xs font-medium">
          {['15m', '1h', '6h'].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                timeRange === r
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative h-64 w-full bg-slate-50/50 dark:bg-[#121c2e]/60 rounded-xl p-3 border border-slate-100 dark:border-[#1e2e48]">
        {/* Academic Simulation Banner */}
        <div className="absolute top-2 right-4 text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 z-10 pointer-events-none">
          Simulated Telemetry Waveform ({timeRange})
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 15, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`color-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.stroke} stopOpacity={0.4} />
                <stop offset="95%" stopColor={config.stroke} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
            
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10, fill: '#8A96A8' }} 
              axisLine={false} 
              tickLine={false}
            />
            
            <YAxis 
              domain={config.domain} 
              tick={{ fontSize: 10, fill: '#8A96A8' }} 
              axisLine={false} 
              tickLine={false}
              unit={config.unit === '%' ? '%' : ''}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white dark:bg-[#0B132B] dark:border dark:border-[#243552] p-2.5 rounded-lg shadow-xl text-xs">
                      <p className="text-slate-400 text-[10px] mb-1 font-mono">{label}</p>
                      <p className="font-bold flex items-center gap-1.5 text-sm">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.stroke }} />
                        <span>{payload[0].value} {config.unit}</span>
                      </p>
                      {activeTab === 'bp' && payload[0].payload.bpDiastolic && (
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          Diastolic: {payload[0].payload.bpDiastolic} mmHg
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            <ReferenceLine 
              y={config.threshold} 
              stroke="#E5485D" 
              strokeDasharray="4 4" 
              label={{ value: config.thresholdLabel, fill: '#E5485D', fontSize: 9, position: 'insideBottomRight' }} 
            />

            <Area
              type="monotone"
              dataKey={config.dataKey}
              stroke={config.stroke}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#color-${activeTab})`}
            />

            {/* Optional second curve for Diastolic BP */}
            {activeTab === 'bp' && (
              <Area
                type="monotone"
                dataKey="bpDiastolic"
                stroke="#64748B"
                strokeWidth={1.5}
                strokeDasharray="2 2"
                fill="none"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
