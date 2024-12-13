import React from 'react';
import { format } from 'date-fns';
import { Task } from '../../types';

interface GanttTooltipProps {
  task: Task;
  position: { x: number; y: number };
}

export function GanttTooltip({ task, position }: GanttTooltipProps) {
  return (
    <div
      className="absolute z-50 bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700 max-w-md"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <h4 className="font-medium text-gray-200 mb-2">{task.title}</h4>
      <div className="space-y-2 text-sm">
        <p className="text-gray-300">{task.description}</p>
        <div className="grid grid-cols-2 gap-x-4 text-gray-400">
          <div>Start: {format(new Date(task.startDate), 'MMM d, yyyy')}</div>
          <div>End: {format(new Date(task.endDate), 'MMM d, yyyy')}</div>
        </div>
        {task.notes && task.notes.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-700">
            <div className="font-medium text-gray-300 mb-1">Notes:</div>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {task.notes.map((note) => (
                <div key={note.id} className="text-gray-400">
                  <div className="text-xs text-gray-500">
                    {format(new Date(note.createdAt), 'MMM d, yyyy HH:mm')}
                  </div>
                  {note.content}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}