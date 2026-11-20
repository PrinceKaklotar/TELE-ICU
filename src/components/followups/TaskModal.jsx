import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CheckSquare, Calendar, UserCheck, AlertCircle } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, initialData = {}, onSubmit }) {
  const { patients, teamMembers } = useApp();

  const [patientId, setPatientId] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('Hetal Patel, RN');
  const [priority, setPriority] = useState('HIGH');
  const [dueTime, setDueTime] = useState('Within 15 mins');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setPatientId(initialData.patientId || (patients[0]?.id || ''));
      setDescription(initialData.prefillDesc || initialData.description || '');
      setAssignedTo(initialData.assignedTo || 'Hetal Patel, RN');
      setPriority(initialData.priority || 'HIGH');
      setDueTime(initialData.dueTime || 'Within 15 mins');
      setNotes(initialData.notes || '');
    }
  }, [initialData, patients]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selPatient = patients.find(p => p.id === patientId);

    onSubmit({
      patientId,
      patientName: selPatient?.name || 'Assigned ICU Patient',
      description,
      assignedTo,
      priority,
      dueTime,
      notes
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Tele-ICU Clinical Follow-up Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            ICU Patient Target
          </label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#243552] bg-white dark:bg-[#121c2e] text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            required
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.bed} — {p.name} ({p.id}) [{p.status}]
              </option>
            ))}
          </select>
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Follow-up Action Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Verify norepinephrine central line infusion rate and titrate for MAP >= 65; order stat blood gas."
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#243552] bg-white dark:bg-[#121c2e] text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            required
          />
        </div>

        {/* Assignee & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Assigned Team Member
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#243552] bg-white dark:bg-[#121c2e] text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            >
              <option value="Hetal Patel, RN">Hetal Patel, RN (Bedside)</option>
              <option value="Chirag Shah, RN">Chirag Shah, RN (Bedside)</option>
              <option value="Dr. Rajesh Shah, MD">Dr. Rajesh Shah, MD (Remote Doctor)</option>
              <option value="Pooja Patel, RN">Pooja Patel, RN (Tele-ICU Lead)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Urgency Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#243552] bg-white dark:bg-[#121c2e] text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            >
              <option value="HIGH">High Priority (Immediate / 15m)</option>
              <option value="MEDIUM">Medium Priority (Within 1h)</option>
              <option value="LOW">Low Priority (Routine Handover)</option>
            </select>
          </div>
        </div>

        {/* Due Time & Context notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Completion Window
            </label>
            <input
              type="text"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              placeholder="e.g., In 15 mins, By 23:30, Stat"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#243552] bg-white dark:bg-[#121c2e] text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Coordination Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Intercom verified with bedside nurse"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#243552] bg-white dark:bg-[#121c2e] text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#243552]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Schedule Follow-up Task</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
