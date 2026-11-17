import React, { useState, useMemo } from 'react';
import { 
  Search, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  ArrowUpDown 
} from 'lucide-react';
import PatientCard from '../patients/PatientCard';
import PatientTableView from '../patients/PatientTableView';
import { useApp } from '../../context/AppContext';

export default function PatientMatrix({ defaultFilter = 'ALL' }) {
  const { patients } = useApp();

  const [statusFilter, setStatusFilter] = useState(defaultFilter);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('severity'); // severity | name | updated
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  // Severity rank for sorting: Critical -> Warning -> Stable -> Offline
  const severityRank = {
    CRITICAL: 1,
    WARNING: 2,
    STABLE: 3,
    OFFLINE: 4
  };

  const filteredPatients = useMemo(() => {
    return patients
      .filter((patient) => {
        if (statusFilter !== 'ALL' && patient.status !== statusFilter) {
          return false;
        }
        if (searchTerm.trim() !== '') {
          const query = searchTerm.toLowerCase();
          const matchName = patient.name.toLowerCase().includes(query);
          const matchId = patient.id.toLowerCase().includes(query);
          const matchBed = patient.bed.toLowerCase().includes(query);
          return matchName || matchId || matchBed;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'severity') {
          return (severityRank[a.status] || 99) - (severityRank[b.status] || 99);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'updated') {
          return (b.lastUpdatedTimestamp || 0) - (a.lastUpdatedTimestamp || 0);
        }
        return 0;
      });
  }, [patients, statusFilter, searchTerm, sortBy]);

  const counts = useMemo(() => {
    return {
      ALL: patients.length,
      CRITICAL: patients.filter(p => p.status === 'CRITICAL').length,
      WARNING: patients.filter(p => p.status === 'WARNING').length,
      STABLE: patients.filter(p => p.status === 'STABLE').length,
      OFFLINE: patients.filter(p => p.status === 'OFFLINE').length,
    };
  }, [patients]);

  const clearFilters = () => {
    setStatusFilter('ALL');
    setSearchTerm('');
    setSortBy('severity');
  };

  return (
    <div className="space-y-3.5">
      {/* Controls Bar */}
      <div className="p-3 lg:p-3.5 rounded-2xl bg-white dark:bg-[#162238] border border-slate-200 dark:border-[#243552] shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left: Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {[
            { id: 'ALL', label: 'All Patients', count: counts.ALL },
            { id: 'CRITICAL', label: 'Critical', count: counts.CRITICAL },
            { id: 'WARNING', label: 'Warning', count: counts.WARNING },
            { id: 'STABLE', label: 'Stable', count: counts.STABLE },
            { id: 'OFFLINE', label: 'Offline', count: counts.OFFLINE },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-[#121c2e] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#1e2e48]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                statusFilter === tab.id ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Right: Search, Sort, View Toggle, Clear */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Quick Search */}
          <div className="relative flex-1 sm:w-44 lg:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-[#121c2e] border border-slate-200 dark:border-[#243552] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#121c2e] px-2 py-1.5 rounded-xl border border-slate-200 dark:border-[#243552]">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="severity">Sort: Critical First</option>
              <option value="name">Sort: Name (A-Z)</option>
              <option value="updated">Sort: Recent Update</option>
            </select>
          </div>

          {/* View Toggle (Grid / List) */}
          <div className="flex items-center bg-slate-100 dark:bg-[#121c2e] p-1 rounded-xl border border-slate-200 dark:border-[#243552]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#1f3354] text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-[#1f3354] text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Clear Filters Button */}
          {(statusFilter !== 'ALL' || searchTerm !== '' || sortBy !== 'severity') && (
            <button
              onClick={clearFilters}
              className="px-2 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors flex items-center gap-1 font-semibold"
              title="Reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Centerpiece: Patient Matrix Grid or Table */}
      {filteredPatients.length === 0 ? (
        <div className="p-10 text-center bg-white dark:bg-[#162238] rounded-2xl border border-slate-200 dark:border-[#243552]">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No patients match current filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-3 px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <PatientTableView patients={filteredPatients} />
      )}
    </div>
  );
}
