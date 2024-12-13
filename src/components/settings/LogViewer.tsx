import React from 'react';
import { logger } from '../../lib/logger';
import { Button } from '../ui/Button';
import { Trash2 } from 'lucide-react';

export function LogViewer() {
  const [logs, setLogs] = React.useState(logger.getLogs());

  const clearLogs = () => {
    logger.clearLogs();
    setLogs([]);
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-blue-500';
      case 'warn': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      case 'success': return 'text-emerald-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-200">System Logs</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={clearLogs}
          className="flex items-center space-x-2"
        >
          <Trash2 size={16} />
          <span>Clear Logs</span>
        </Button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index} className="text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">
                {new Date(log.timestamp).toLocaleString()}
              </span>
              <span className={`font-medium ${getLogColor(log.level)}`}>
                [{log.level.toUpperCase()}]
              </span>
              <span className="text-gray-200">{log.message}</span>
            </div>
            {log.details && (
              <pre className="mt-1 text-xs text-gray-400 overflow-x-auto">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}