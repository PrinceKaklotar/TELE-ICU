import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { FileText, Send, User } from 'lucide-react';

export default function AddNoteModal({ isOpen, onClose, patient }) {
  const { addPatientNote } = useApp();
  const [content, setContent] = useState('');

  if (!patient) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    addPatientNote(patient.id, content.trim());
    setContent('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Clinical Tele-Observation Note — ${patient.name} (${patient.id})`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Context Strip */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552] flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">{patient.bed}</span>
            <span className="text-slate-400 mx-1.5">•</span>
            <span className="text-slate-500 dark:text-slate-400">{patient.admissionReason}</span>
          </div>
          <span className="text-slate-400 font-mono">Telemetry Active</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Tele-ICU Nurse Clinical Observation
          </label>
          <textarea
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Document vital trends, communication with bedside RN, telemetry alarms reviewed, or clinical interventions observed..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#243552] bg-white dark:bg-[#121c2e] text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <User className="w-3.5 h-3.5" />
            <span>Author: Pooja Patel, RN (Tele-ICU)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
