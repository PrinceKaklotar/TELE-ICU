import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Heart, 
  Wind, 
  Gauge, 
  Activity, 
  Thermometer, 
  MessageSquare, 
  ClipboardList, 
  FileText, 
  UserCheck, 
  Stethoscope, 
  Clock, 
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../common/StatusBadge';
import VitalsMetricCard from './VitalsMetricCard';
import VitalsChart from '../charts/VitalsChart';
import { useNavigate } from 'react-router-dom';

export default function PatientDetailDrawer() {
  const { 
    selectedPatient, 
    setSelectedPatientId, 
    setTaskModalContext, 
    setAddNoteModalPatient,
    activities,
    alerts
  } = useApp();

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedPatient) {
        setSelectedPatientId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPatient, setSelectedPatientId]);

  if (!selectedPatient) return null;

  const { vitals } = selectedPatient;

  // Filter activities for this patient
  const patientActivities = activities.filter(
    a => a.patientId === selectedPatient.id || a.patientId === 'ALL'
  ).slice(0, 5);

  const patientAlerts = alerts.filter(a => a.patientId === selectedPatient.id);

  const handleOpenAlerts = () => {
    setSelectedPatientId(null);
    navigate(`/alerts?patient=${selectedPatient.id}`);
  };

  const handleContactBedside = () => {
    setSelectedPatientId(null);
    navigate('/communication');
  };

  const handleCreateFollowup = () => {
    setTaskModalContext({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      prefillDesc: `Follow-up for ${selectedPatient.bed} (${selectedPatient.name}): verify clinical response.`
    });
  };

  const handleAddNote = () => {
    setAddNoteModalPatient(selectedPatient);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPatientId(null)}
          className="fixed inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-2xl lg:max-w-3xl bg-white dark:bg-[#14243A] shadow-2xl border-l border-slate-200 dark:border-[#243552] flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 lg:p-5 border-b border-slate-200 dark:border-[#243552] bg-slate-50 dark:bg-[#121c2e] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                      {selectedPatient.name}
                    </h3>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                      {selectedPatient.id}
                    </span>
                    <StatusBadge status={selectedPatient.status} size="sm" />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedPatient.bed}</span>
                    <span>•</span>
                    <span>{selectedPatient.age} yrs, {selectedPatient.gender}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3" />
                      {selectedPatient.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPatientId(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 rounded-xl transition-colors shrink-0"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Bar */}
            <div className="px-4 lg:px-5 py-2.5 border-b border-slate-100 dark:border-[#243552] bg-white dark:bg-[#14243A] flex items-center gap-2 overflow-x-auto">
              <button
                onClick={handleOpenAlerts}
                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Alerts ({patientAlerts.length})</span>
              </button>

              <button
                onClick={handleAddNote}
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>

              <button
                onClick={handleCreateFollowup}
                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <ClipboardList className="w-3.5 h-3.5" />
                <span>Create Follow-up</span>
              </button>

              <button
                onClick={handleContactBedside}
                className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/50 text-teal-700 dark:text-teal-300 font-semibold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Contact Bedside</span>
              </button>
            </div>

            {/* Scrollable Content in 4 Clear Sections */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-5">
              {/* 1. Patient Information */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  1. Patient Information
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Bed:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{selectedPatient.bed}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Age / Gender:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{selectedPatient.age} yrs / {selectedPatient.gender}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Bedside Nurse:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{selectedPatient.assignedNurse}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Remote Doctor:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{selectedPatient.remoteDoctor}</span>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200/80 dark:border-[#243552] text-xs">
                  <span className="text-slate-400 text-[11px]">Clinical Reason: </span>
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{selectedPatient.admissionReason}</span>
                </div>
              </div>

              {/* 2. Vital Signs */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  2. Vital Signs (Simulated Telemetry)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  <VitalsMetricCard
                    label="Heart Rate"
                    value={vitals.heartRate}
                    unit={vitals.heartRateUnit}
                    prevValue={vitals.prevHeartRate}
                    icon={Heart}
                    colorClass="bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300"
                    status={typeof vitals.heartRate === 'number' && (vitals.heartRate > 120 || vitals.heartRate < 50) ? 'critical' : 'normal'}
                  />

                  <VitalsMetricCard
                    label="SpO2 Sat"
                    value={vitals.spo2}
                    unit={vitals.spo2Unit}
                    prevValue={vitals.prevSpo2}
                    icon={Wind}
                    colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
                    status={typeof vitals.spo2 === 'number' && vitals.spo2 < 90 ? 'critical' : typeof vitals.spo2 === 'number' && vitals.spo2 < 94 ? 'warning' : 'normal'}
                  />

                  <VitalsMetricCard
                    label="Blood Pressure"
                    value={vitals.bpSystolic && vitals.bpDiastolic ? `${vitals.bpSystolic}/${vitals.bpDiastolic}` : '--'}
                    unit={vitals.bpUnit}
                    prevValue={vitals.prevBp}
                    icon={Gauge}
                    colorClass="bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300"
                    status={typeof vitals.bpSystolic === 'number' && (vitals.bpSystolic < 90 || vitals.bpSystolic > 160) ? 'warning' : 'normal'}
                  />

                  <VitalsMetricCard
                    label="Resp Rate"
                    value={vitals.respiratoryRate}
                    unit={vitals.respiratoryRateUnit}
                    prevValue={vitals.prevRespiratoryRate}
                    icon={Activity}
                    colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300"
                    status={typeof vitals.respiratoryRate === 'number' && vitals.respiratoryRate > 24 ? 'warning' : 'normal'}
                  />

                  <VitalsMetricCard
                    label="Temperature"
                    value={vitals.temperature}
                    unit={vitals.temperatureUnit}
                    prevValue={vitals.prevTemperature}
                    icon={Thermometer}
                    colorClass="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300"
                    status={typeof vitals.temperature === 'number' && vitals.temperature > 38.0 ? 'warning' : 'normal'}
                  />
                </div>
              </div>

              {/* 3. Vital Trends */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  3. Vital Trends (Interactive)
                </h4>
                <VitalsChart patientId={selectedPatient.id} patientStatus={selectedPatient.status} />
              </div>

              {/* 4. Activity History & Observations */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    4. Activity History & Notes
                  </h4>
                  <button
                    onClick={handleAddNote}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    + Add Note
                  </button>
                </div>

                {/* Notes List */}
                {selectedPatient.notes && selectedPatient.notes.length > 0 && (
                  <div className="mb-3 space-y-1.5">
                    {selectedPatient.notes.map(n => (
                      <div key={n.id} className="p-2.5 rounded-lg bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] text-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-0.5">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{n.author}</span>
                          <span>{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">{n.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Short Timeline List */}
                <div className="divide-y divide-slate-200/80 dark:divide-[#243552] text-xs">
                  {patientActivities.map(act => (
                    <div key={act.id} className="py-2 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 mr-2">{act.type.replace('_', ' ')}:</span>
                        <span className="text-slate-600 dark:text-slate-400">{act.description}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 shrink-0">{act.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-200 dark:border-[#243552] bg-slate-50 dark:bg-[#121c2e] flex items-center justify-between text-xs text-slate-400">
              <span>Telemetry Connected</span>
              <button
                onClick={() => setSelectedPatientId(null)}
                className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
