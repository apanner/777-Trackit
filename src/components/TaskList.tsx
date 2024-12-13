import React from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { Button } from './ui/Button';

export function TaskList() {
  const { tasks, workers, updateTask, deleteTask } = useStore();

  const getWorkerName = (workerId: string) => {
    const worker = workers.find((w) => w.id === workerId);
    return worker ? worker.name : 'Unassigned';
  };

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
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 rounded-lg bg-gray-800 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-200">{task.title}</h3>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 text-xs rounded ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
              <span className="px-2 py-1 text-xs bg-gray-700 rounded">
                {task.status}
              </span>
            </div>
          </div>
          
          <p className="mt-2 text-gray-400">{task.description}</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <span className="font-medium">Assigned to:</span>{' '}
              {getWorkerName(task.assignedTo)}
            </div>
            <div>
              <span className="font-medium">Due:</span>{' '}
              {format(new Date(task.endDate), 'MMM dd, yyyy')}
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateTask(task.id, {
                  status:
                    task.status === 'Complete' ? 'In Progress' : 'Complete',
                })
              }
            >
              {task.status === 'Complete' ? 'Reopen' : 'Complete'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}