// Helper utilities for Tele-ICU Command Center

export const formatTime = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
};

export const formatDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const getStatusConfig = (status) => {
  switch (status?.toUpperCase()) {
    case 'CRITICAL':
      return {
        label: 'Critical',
        color: '#E5485D',
        textColor: 'text-[#E5485D] dark:text-[#FF6B7D]',
        bgClass: 'bg-[#FDEBED] dark:bg-[#E5485D]/15',
        borderClass: 'border-[#E5485D]/30',
        badgeClass: 'bg-[#FDEBED] text-[#E5485D] border border-[#E5485D]/30 dark:bg-[#E5485D]/20 dark:text-[#FF808F]',
        dotClass: 'bg-[#E5485D]',
      };
    case 'WARNING':
      return {
        label: 'Warning',
        color: '#EFA72F',
        textColor: 'text-[#D98205] dark:text-[#FBBF24]',
        bgClass: 'bg-[#FFF4DF] dark:bg-[#EFA72F]/15',
        borderClass: 'border-[#EFA72F]/30',
        badgeClass: 'bg-[#FFF4DF] text-[#C47400] border border-[#EFA72F]/30 dark:bg-[#EFA72F]/20 dark:text-[#FCD34D]',
        dotClass: 'bg-[#EFA72F]',
      };
    case 'STABLE':
      return {
        label: 'Stable',
        color: '#16A36A',
        textColor: 'text-[#16A36A] dark:text-[#34D399]',
        bgClass: 'bg-[#E6F7EF] dark:bg-[#16A36A]/15',
        borderClass: 'border-[#16A36A]/30',
        badgeClass: 'bg-[#E6F7EF] text-[#16A36A] border border-[#16A36A]/30 dark:bg-[#16A36A]/20 dark:text-[#6EE7B7]',
        dotClass: 'bg-[#16A36A]',
      };
    case 'OFFLINE':
    default:
      return {
        label: 'Offline',
        color: '#8A96A8',
        textColor: 'text-[#8A96A8] dark:text-[#94A3B8]',
        bgClass: 'bg-[#EEF1F5] dark:bg-[#8A96A8]/15',
        borderClass: 'border-[#8A96A8]/30',
        badgeClass: 'bg-[#EEF1F5] text-[#64748B] border border-[#8A96A8]/30 dark:bg-[#8A96A8]/20 dark:text-[#94A3B8]',
        dotClass: 'bg-[#8A96A8]',
      };
  }
};

export const getPriorityConfig = (priority) => {
  switch (priority?.toUpperCase()) {
    case 'HIGH':
      return {
        label: 'High Priority',
        textColor: 'text-rose-600 dark:text-rose-400',
        bgClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900',
        badgeClass: 'bg-rose-500',
      };
    case 'MEDIUM':
      return {
        label: 'Medium Priority',
        textColor: 'text-amber-600 dark:text-amber-400',
        bgClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
        badgeClass: 'bg-amber-500',
      };
    case 'LOW':
    default:
      return {
        label: 'Low Priority',
        textColor: 'text-blue-600 dark:text-blue-400',
        bgClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',
        badgeClass: 'bg-blue-500',
      };
  }
};
