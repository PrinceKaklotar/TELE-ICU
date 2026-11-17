import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  UserCheck, 
  Trash2, 
  Check, 
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getPriorityConfig } from '../../utils/helpers';
import Modal from '../common/Modal';

export default function KanbanBoard({ tasks }) {
  const { updateTaskStatus, deleteTask, setSelectedPatientId } = useApp();
  const [activeTaskDetail, setActiveTaskDetail] = useState(null);

  const columns = [
    {
      id: 'PENDING',
      title: 'Pending',
      color: 'bg-amber-500',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
    },
    {
      id: 'IN_PROGRESS',
      title: 'In Progress',
      color: 'bg-blue-500',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300'
    },
    {
      id: 'COMPLETED',
      title: 'Completed',
      color: 'bg-emerald-500',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
    }
  ];

  const handleDelete = (taskId, e) => {
    e.stopPropagation();
    if (window.confirm(`Delete task ${taskId}?`)) {
      deleteTask(taskId);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);

          return (
            <div
              key={col.id}
              className="flex flex-col bg-slate-100/60 dark:bg-[#121c2e] rounded-2xl border border-slate-200 dark:border-[#243552] p-3.5 min-h-[460px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-[#243552]">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                    {col.title}
                  </h3>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${col.badge}`}>
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards in this column */}
              <div className="space-y-2.5 pt-3 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="py-10 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                    No tasks in {col.title.toLowerCase()}
                  </div>
                ) : (
                  colTasks.map((task) => {
                    const prio = getPriorityConfig(task.priority);

                    return (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setActiveTaskDetail(task)}
                        className="p-3.5 rounded-xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2.5"
                      >
                        {/* Top: Priority badge & Task ID */}
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${prio.bgClass}`}>
                            {task.priority} Priority
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] text-slate-400 font-medium">
                              {task.id}
                            </span>
                            <button
                              onClick={(e) => handleDelete(task.id, e)}
                              className="text-slate-300 hover:text-rose-500 p-0.5 transition-colors"
                              title="Delete task"
                              aria-label="Delete task"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Patient info */}
                        <div>
                          <p className="font-bold text-xs text-slate-900 dark:text-white">
                            {task.patientName}
                          </p>
                          <p className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                            {task.patientId}
                          </p>
                        </div>

                        {/* Short description */}
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {task.description}
                        </p>

                        {/* Assignee & Due Window */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-[#243552]">
                          <span className="truncate max-w-[130px]">
                            Assigned: {task.assignedTo.split(',')[0]}
                          </span>
                          <span className="font-mono text-slate-400">
                            Due: {task.dueTime}
                          </span>
                        </div>

                        {/* Status Action Buttons */}
                        <div 
                          className="pt-2 border-t border-slate-100 dark:border-[#243552] flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {col.id !== 'PENDING' && (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'PENDING')}
                              className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-colors"
                            >
                              Pending
                            </button>
                          )}
                          {col.id !== 'IN_PROGRESS' && (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'IN_PROGRESS')}
                              className="px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-[11px] font-medium transition-colors"
                            >
                              In Progress
                            </button>
                          )}
                          {col.id !== 'COMPLETED' && (
                            <button
                              onClick={() => updateTaskStatus(task.id, 'COMPLETED')}
                              className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium transition-colors"
                            >
                              Completed
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal if clicked */}
      {activeTaskDetail && (
        <Modal
          isOpen={Boolean(activeTaskDetail)}
          onClose={() => setActiveTaskDetail(null)}
          title={`Follow-up Details — ${activeTaskDetail.id}`}
        >
          <div className="space-y-3.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{activeTaskDetail.patientName}</p>
                  <p className="font-mono text-slate-400">{activeTaskDetail.patientId}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${getPriorityConfig(activeTaskDetail.priority).bgClass}`}>
                  {activeTaskDetail.priority}
                </span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block text-[11px]">Task Description:</span>
              <p className="mt-1 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">{activeTaskDetail.description}</p>
            </div>

            {activeTaskDetail.notes && (
              <div>
                <span className="text-slate-400 font-semibold block text-[11px]">Coordination Notes:</span>
                <p className="mt-1 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#121c2e] p-2.5 rounded-lg italic">
                  {activeTaskDetail.notes}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-[#243552]">
              <div>
                <span className="text-slate-400 block text-[11px]">Assigned Staff:</span>
                <span className="font-semibold text-slate-800 dark:text-white">{activeTaskDetail.assignedTo}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Target Window:</span>
                <span className="font-semibold text-slate-800 dark:text-white">{activeTaskDetail.dueTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#243552]">
              <button
                onClick={() => {
                  setSelectedPatientId(activeTaskDetail.patientId);
                  setActiveTaskDetail(null);
                }}
                className="text-blue-600 dark:text-blue-400 font-semibold text-xs hover:underline"
              >
                Open Patient Card &rarr;
              </button>

              <button
                onClick={() => setActiveTaskDetail(null)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
