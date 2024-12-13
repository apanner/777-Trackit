import React from 'react';
import { useStore } from '../../store/useStore';
import { format, differenceInDays, addDays, startOfMonth, endOfMonth } from 'date-fns';
import { Task } from '../../types';

export function GanttChart() {
  const { tasks, workers } = useStore();
  const today = new Date();
  const startDate = startOfMonth(today);
  const endDate = endOfMonth(addDays(today, 60)); // Show 2 months
  const totalDays = differenceInDays(endDate, startDate) + 1;

  const getTaskWidth = (task: Task) => {
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);
    const taskDays = differenceInDays(end, start) + 1;
    return (taskDays / totalDays) * 100;
  };

  const getTaskOffset = (task: Task) => {
    const start = new Date(task.startDate);
    const offset = differenceInDays(start, startDate);
    return (offset / totalDays) * 100;
  };

  const getTaskColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500 border-red-600';
      case 'Medium':
        return 'bg-yellow-500 border-yellow-600';
      case 'Low':
        return 'bg-green-500 border-green-600';
      default:
        return 'bg-blue-500 border-blue-600';
    }
  };

  const renderTimeScale = () => {
    const days = [];
    for (let i = 0; i < totalDays; i++) {
      const date = addDays(startDate, i);
      days.push(
        <div
          key={i}
          className="flex-shrink-0 w-10 text-xs text-gray-400 text-center border-r border-gray-700"
        >
          {format(date, 'd')}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200">Project Timeline</h2>
      </div>
      
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full">
          {/* Header */}
          <div className="sticky left-0 w-64 bg-gray-800 border-r border-gray-700 z-10">
            <div className="h-8 px-4 flex items-center font-semibold text-gray-200 border-b border-gray-700">
              Task
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex h-8 border-b border-gray-700">
              {renderTimeScale()}
            </div>
          </div>
        </div>

        {/* Tasks */}
        {tasks.map((task) => (
          <div key={task.id} className="inline-flex min-w-full">
            <div className="sticky left-0 w-64 bg-gray-800 border-r border-gray-700 z-10">
              <div className="px-4 py-2 text-sm text-gray-200">
                <div className="font-medium">{task.title}</div>
                <div className="text-xs text-gray-400">
                  {workers.find((w) => w.id === task.assignedTo)?.name}
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative h-12">
              <div
                className={`absolute h-6 top-3 rounded border ${getTaskColor(
                  task.priority
                )}`}
                style={{
                  left: `${getTaskOffset(task)}%`,
                  width: `${getTaskWidth(task)}%`,
                }}
              >
                <div className="px-2 truncate text-xs text-white leading-6">
                  {task.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}