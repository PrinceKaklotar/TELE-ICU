import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon, WifiOff } from 'lucide-react';
import { getStatusConfig } from '../../utils/helpers';

export default function StatusBadge({ status, size = 'md', showIcon = true, className = '' }) {
  const config = getStatusConfig(status);

  const getIcon = () => {
    switch (status?.toUpperCase()) {
      case 'CRITICAL':
        return <AlertOctagon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'WARNING':
        return <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'STABLE':
        return <CheckCircle2 className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
      case 'OFFLINE':
      default:
        return <WifiOff className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />;
    }
  };

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs font-semibold' 
    : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${config.badgeClass} ${sizeClasses} ${className}`}
      title={`Patient Status: ${config.label}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      {showIcon && getIcon()}
      <span>{config.label}</span>
    </span>
  );
}
