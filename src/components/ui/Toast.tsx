import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export function Toast({ type, message, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
  };

  const backgrounds = {
    success: 'bg-green-500 bg-opacity-10 border-green-500',
    error: 'bg-red-500 bg-opacity-10 border-red-500',
    info: 'bg-blue-500 bg-opacity-10 border-blue-500',
  };

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 flex items-center p-4 rounded-lg border shadow-lg z-50 transform transition-all duration-300 ease-in-out',
        backgrounds[type]
      )}
    >
      <div className="flex items-center space-x-3">
        {icons[type]}
        <p className="text-gray-200">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-200 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}