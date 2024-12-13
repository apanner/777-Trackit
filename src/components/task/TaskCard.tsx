import React, { useState } from 'react';
import { format } from 'date-fns';
import { Task } from '../../types';
import { useStore } from '../../store/useStore';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { workers } = useStore();
  const [showNotes, setShowNotes] = useState(false);
  const worker = workers.find(w => w.id === task.assignedTo);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="p-3 bg-gray-700 rounded-lg relative group"
      onMouseEnter={() => setShowNotes(true)}
      onMouseLeave={() => setShowNotes(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-200">{task.title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-400">
        <p>Assigned to: {worker?.name || 'Unassigned'}</p>
        <p>Due: {format(new Date(task.endDate), 'MMM dd, yyyy')}</p>
      </div>

      {/* Notes Tooltip */}
      {showNotes && task.notes && task.notes.length > 0 && (
        <div className="absolute left-0 right-0 -bottom-2 transform translate-y-full z-50 bg-gray-800 rounded-lg shadow-xl p-3 border border-gray-700 max-w-md">
          <h4 className="text-sm font-medium text-gray-200 mb-2">Notes</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {task.notes.map((note) => (
              <div key={note.id} className="text-sm">
                <div className="text-xs text-gray-400">
                  {format(new Date(note.createdAt), 'MMM d, yyyy HH:mm')}
                </div>
                <p className="text-gray-200">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}