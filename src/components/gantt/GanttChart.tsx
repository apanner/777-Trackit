import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/useAuthStore';
import { format, addDays, startOfDay, addMonths } from 'date-fns';
import { Task } from '../../types';
import { GanttTooltip } from './GanttTooltip';

const WORKER_COLORS = [
  'bg-emerald-500 border-emerald-600',
  'bg-blue-500 border-blue-600',
  'bg-purple-500 border-purple-600',
  'bg-pink-500 border-pink-600',
  'bg-orange-500 border-orange-600',
  'bg-cyan-500 border-cyan-600',
  'bg-indigo-500 border-indigo-600',
  'bg-rose-500 border-rose-600',
];

export function GanttChart() {
  const { tasks, workers } = useStore();
  const { currentUser, isAdmin } = useAuthStore();
  const [hoveredTask, setHoveredTask] = useState<{ task: Task; x: number; y: number } | null>(null);
  
  // Filter tasks based on user role
  const filteredTasks = tasks.filter(task => {
    if (isAdmin) {
      return true; // Admin sees all tasks
    }
    return task.assignedTo === currentUser?.id; // Users see only their tasks
  });

  const today = startOfDay(new Date());
  const startDate = today;
  const endDate = addMonths(startDate, 1);
  const days = Array.from({ length: 30 }, (_, i) => addDays(startDate, i));

  const getWorkerColor = (workerId: string) => {
    const workerIndex = workers.findIndex(w => w.id === workerId);
    return WORKER_COLORS[workerIndex % WORKER_COLORS.length];
  };

  const getTaskPosition = (task: Task) => {
    const start = new Date(task.startDate);
    const end = new Date(task.endDate);
    const dayWidth = 100 / 30;

    const startOffset = Math.max(0, Math.floor((start.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return {
      left: `${startOffset * dayWidth}%`,
      width: `${Math.min(duration * dayWidth, 100 - (startOffset * dayWidth))}%`,
    };
  };

  const handleTaskHover = (task: Task, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredTask({
      task,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200">30 Day Timeline</h2>
      </div>
      
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full">
          {/* Header */}
          <div className="sticky left-0 w-64 bg-gray-800 border-r border-gray-700 z-10">
            <div className="h-16 px-4 flex items-center font-semibold text-gray-200 border-b border-gray-700">
              Workers & Tasks
            </div>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-30 h-16 border-b border-gray-700">
              {days.map((day, i) => (
                <div key={i} className="border-r border-gray-700 p-2">
                  <div className="text-xs text-gray-400">{format(day, 'EEE')}</div>
                  <div className="text-sm font-medium text-gray-200">{format(day, 'MMM d')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Group tasks by worker */}
        {workers.map((worker) => {
          const workerTasks = filteredTasks.filter(t => t.assignedTo === worker.id);
          if (workerTasks.length === 0) return null;

          return (
            <div key={worker.id} className="border-b border-gray-700">
              <div className="inline-flex min-w-full">
                <div className="sticky left-0 w-64 bg-gray-800 border-r border-gray-700 z-10">
                  <div className="px-4 py-3 text-sm font-medium text-gray-200">
                    {worker.name}
                  </div>
                </div>
                
                <div className="flex-1 relative min-h-[100px]">
                  {workerTasks.map((task) => {
                    const position = getTaskPosition(task);
                    return (
                      <div
                        key={task.id}
                        className={`absolute h-8 mt-2 rounded border ${getWorkerColor(task.assignedTo)} shadow-md transition-all hover:h-10 hover:-mt-0 cursor-pointer`}
                        style={position}
                        onMouseEnter={(e) => handleTaskHover(task, e)}
                        onMouseLeave={() => setHoveredTask(null)}
                      >
                        <div className="px-2 truncate text-xs text-white leading-8">
                          {task.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hoveredTask && (
        <GanttTooltip task={hoveredTask.task} position={{ x: hoveredTask.x, y: hoveredTask.y }} />
      )}
    </div>
  );
}