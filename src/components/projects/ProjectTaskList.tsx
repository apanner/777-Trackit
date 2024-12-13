import React from 'react';
import { useStore } from '../../store/useStore';
import { formatDate } from '../../utils/dateUtils';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';

interface ProjectTaskListProps {
  projectId: string;
}

export function ProjectTaskList({ projectId }: ProjectTaskListProps) {
  const { tasks, workers, updateTask } = useStore();
  const { isAdmin } = useAuthStore();
  const projectTasks = tasks.filter(task => task.projectId === projectId);

  const handleStatusChange = (taskId: string, newStatus: string) => {
    updateTask(taskId, { 
      status: newStatus,
      completedAt: newStatus === 'Complete' ? new Date().toISOString() : undefined
    });
  };

  if (projectTasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No tasks assigned to this project yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projectTasks.map(task => {
        const worker = workers.find(w => w.id === task.assignedTo);
        return (
          <div key={task.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-200">{task.title}</h4>
              <span className={`px-2 py-1 text-xs rounded ${
                task.status === 'Complete' ? 'bg-green-500' : 
                task.status === 'In Progress' ? 'bg-blue-500' : 
                'bg-gray-500'
              } text-white`}>
                {task.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-400 mb-3">{task.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                <p>Assigned to: {worker?.name || 'Unassigned'}</p>
                <p>Due: {formatDate(task.endDate)}</p>
              </div>
              
              {(isAdmin || worker?.id === task.assignedTo) && task.status !== 'Complete' && (
                <div className="flex space-x-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleStatusChange(task.id, 'Complete')}
                  >
                    Task Complete
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleStatusChange(task.id, 'Extended')}
                  >
                    Extend Task
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}