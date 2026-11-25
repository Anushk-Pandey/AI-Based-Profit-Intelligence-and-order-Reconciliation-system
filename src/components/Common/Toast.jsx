import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useProfit } from '../../context/ProfitContext';

export default function Toast() {
  const { toast } = useProfit();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 text-xs font-medium max-w-md">
      {toast.type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
      ) : toast.type === 'warning' ? (
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
      )}
      <span className="leading-snug">{toast.message}</span>
    </div>
  );
}
