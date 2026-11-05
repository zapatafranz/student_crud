import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Alert({ alert, onClose }) {
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [alert, onClose]);

  if (!alert) return null;

  const isSuccess = alert.type === 'success';

  return (
    <div
      className={`mb-6 p-4 rounded-xl border flex items-center justify-between shadow-sm transition-all duration-300 ${
        isSuccess
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
          : 'bg-rose-50 border-rose-200 text-rose-800'
      }`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
        )}
        <span className="text-sm font-medium">{alert.message}</span>
      </div>
      <button
        onClick={onClose}
        className={`p-1 rounded-lg hover:bg-black/5 transition-colors ${
          isSuccess ? 'text-emerald-700' : 'text-rose-700'
        }`}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
