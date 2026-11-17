import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Bell, 
  Sliders, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  Play, 
  Pause, 
  Square,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { 
    theme, 
    toggleTheme, 
    simulationState, 
    setSimulationState, 
    resetDemoData, 
    addToast 
  } = useApp();

  const [audioAlarms, setAudioAlarms] = useState(false);
  const [criticalPopups, setCriticalPopups] = useState(true);
  const [density, setDensity] = useState('comfortable'); // comfortable | compact
  const [simInterval, setSimInterval] = useState('6s');

  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore the default simulated patient data, alerts, follow-ups, and messages?")) {
      resetDemoData();
    }
  };

  const handleSavePreferences = () => {
    addToast({
      title: 'Preferences Saved',
      message: 'Command center configuration updated successfully.',
      type: 'success'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Header Banner */}
      <div className="flex items-center gap-3 p-5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm">
        <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Command Center Configuration
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interface customization, telemetry simulation engine controls, and demo environment reset.
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="space-y-4">
        {/* Visual Appearance & Theme */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Interface Appearance & Display
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Theme Toggle Card */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-[#243552] bg-slate-50 dark:bg-[#121c2e] flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Color System Theme</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Currently: {theme === 'dark' ? 'Dark Command Theme' : 'Light Clinical Theme'}</p>
              </div>

              <button
                onClick={toggleTheme}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1f3354] border border-slate-200 dark:border-[#243552] text-xs font-semibold flex items-center gap-1.5 shadow-sm text-slate-800 dark:text-white"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                <span>{theme === 'dark' ? 'Switch Light' : 'Switch Dark'}</span>
              </button>
            </div>

            {/* Layout Density */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-[#243552] bg-slate-50 dark:bg-[#121c2e] flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Layout Density</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Card padding & matrix spacing</p>
              </div>

              <select
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#243552] bg-white dark:bg-[#1f3354] text-xs font-semibold text-slate-800 dark:text-white outline-none"
              >
                <option value="comfortable">Comfortable</option>
                <option value="compact">High Density</option>
              </select>
            </div>
          </div>
        </div>

        {/* Simulation Engine Controls */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Telemetry Simulation Engine
            </h3>
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
              simulationState === 'RUNNING' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' :
              simulationState === 'PAUSED' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' :
              'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}>
              State: {simulationState}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Controls the background physiological data stream. Uses rule-based clinical drift parameters instead of unbounded random numbers.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setSimulationState('RUNNING')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                simulationState === 'RUNNING'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Resume Engine</span>
            </button>

            <button
              onClick={() => setSimulationState('PAUSED')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                simulationState === 'PAUSED'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Updates</span>
            </button>

            <button
              onClick={() => setSimulationState('STOPPED')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                simulationState === 'STOPPED'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Halt Telemetry</span>
            </button>
          </div>
        </div>

        {/* Alarm & Notification Preferences */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Alarm Fatigue Mitigation & Notifications
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552] cursor-pointer">
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Critical Alert Toast Notifications</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Display floating toast when MAP &lt; 65 or SpO2 &lt; 90% alarms fire</p>
              </div>
              <input
                type="checkbox"
                checked={criticalPopups}
                onChange={(e) => setCriticalPopups(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552] cursor-pointer">
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">Simulated Bedside Audio Chime</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Auditory feedback on new telemetry alerts (Muted by default to reduce nurse alarm fatigue)</p>
              </div>
              <input
                type="checkbox"
                checked={audioAlarms}
                onChange={(e) => setAudioAlarms(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Reset Demonstration Data */}
        <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-rose-800 dark:text-rose-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Reset Demonstration Environment
            </h3>
            <p className="text-xs text-rose-600/80 dark:text-rose-400 mt-1 max-w-md">
              Restores the default initial state for all 8 patients, default alerts, follow-up tasks, and chat conversations.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-rose-600/20 flex items-center gap-1.5 transition-all shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Demo Data</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
