import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Heart, Wind, Gauge, Activity, Clock } from 'lucide-react';

export default function PatientTableView({ patients }) {
  const { setSelectedPatientId } = useApp();

  return (
    <div className="bg-white dark:bg-[#162238] rounded-2xl border border-slate-200 dark:border-[#243552] shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-200">
          <thead className="bg-slate-50 dark:bg-[#121c2e] text-[11px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-200 dark:border-[#243552]">
            <tr>
              <th className="py-3.5 px-4">Bed & Patient</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 px-3">Heart Rate</th>
              <th className="py-3.5 px-3">SpO2</th>
              <th className="py-3.5 px-3">Blood Pressure</th>
              <th className="py-3.5 px-3">Resp Rate</th>
              <th className="py-3.5 px-3">Care Team</th>
              <th className="py-3.5 px-3">Last Sync</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#243552]">
            {patients.map((patient) => {
              const { vitals } = patient;
              const isCrit = patient.status === 'CRITICAL';
              const isWarn = patient.status === 'WARNING';

              return (
                <tr
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`hover:bg-slate-50/80 dark:hover:bg-[#1b2b46] cursor-pointer transition-colors ${
                    isCrit ? 'bg-rose-50/20 dark:bg-rose-950/10' :
                    isWarn ? 'bg-amber-50/20 dark:bg-amber-950/10' : ''
                  }`}
                >
                  {/* Bed & Patient */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded-md shrink-0">
                        {patient.bed}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {patient.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span className="font-mono">{patient.id}</span>
                          <span>•</span>
                          <span>{patient.age}y {patient.gender[0]}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <StatusBadge status={patient.status} size="sm" />
                  </td>

                  {/* Heart Rate */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-sm">
                      <Heart className={`w-3.5 h-3.5 ${
                        isCrit ? 'text-rose-500' : isWarn ? 'text-amber-500' : 'text-emerald-500'
                      }`} />
                      <span className={isCrit ? 'text-rose-600 dark:text-rose-400' : ''}>
                        {vitals.heartRate}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">bpm</span>
                    </div>
                  </td>

                  {/* SpO2 */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-sm">
                      <Wind className="w-3.5 h-3.5 text-blue-500" />
                      <span className={typeof vitals.spo2 === 'number' && vitals.spo2 < 90 ? 'text-rose-600 dark:text-rose-400' : ''}>
                        {vitals.spo2}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">%</span>
                    </div>
                  </td>

                  {/* Blood Pressure */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-semibold">
                      <Gauge className="w-3.5 h-3.5 text-slate-400" />
                      <span>{vitals.bpSystolic && vitals.bpDiastolic ? `${vitals.bpSystolic}/${vitals.bpDiastolic}` : '--'}</span>
                    </div>
                  </td>

                  {/* Resp Rate */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-semibold">
                      <Activity className="w-3.5 h-3.5 text-slate-400" />
                      <span>{vitals.respiratoryRate ? `${vitals.respiratoryRate} /m` : '--'}</span>
                    </div>
                  </td>

                  {/* Care Team */}
                  <td className="py-3.5 px-3">
                    <div className="text-xs">
                      <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{patient.assignedNurse}</p>
                      <p className="text-[10px] text-slate-400 truncate">{patient.remoteDoctor}</p>
                    </div>
                  </td>

                  {/* Last Sync */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{patient.lastUpdated}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPatientId(patient.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-300 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <span>Review</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
