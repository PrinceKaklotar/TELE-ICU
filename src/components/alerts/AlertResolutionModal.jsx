import React, { useState } from 'react';
import Modal from '../common/Modal';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AlertResolutionModal({ isOpen, onClose, alert, onConfirm }) {
  const [resolutionNote, setResolutionNote] = useState('');

  if (!alert) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm(resolutionNote.trim() || 'Bedside evaluation complete and vitals stabilized within protocol parameters.');
    setResolutionNote('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Confirm Resolution — Alert ${alert.id}`}>
      <form onSubmit={handleConfirm} className="space-y-4">
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold">{alert.type}</p>
            <p className="mt-0.5 text-amber-700/80 dark:text-amber-300/80">{alert.patientName} ({alert.bed})</p>
            <p className="mt-1 font-mono text-[11px]">{alert.description}</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Resolution Summary & Bedside Confirmation (Required)
          </label>
          <textarea
            rows={3}
            value={resolutionNote}
            onChange={(e) => setResolutionNote(e.target.value)}
            placeholder="e.g., Bedside nurse verified blood pressure normalized to 118/76 mmHg following IV bolus; lead reattached; continuous alarm deactivated."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#243552] bg-white dark:bg-[#121c2e] text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            required
          />
        </div>

        <p className="text-[11px] text-slate-400 italic">
          Note: Marking an alert resolved documents the conclusion of the acute clinical event in the tele-ICU audit log. It does not replace bedside documentation.
        </p>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-[#243552]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Alert Resolution</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
