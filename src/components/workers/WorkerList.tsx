import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, Briefcase, CheckCircle, XCircle, Edit2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { WorkerEditForm } from './WorkerEditForm';

export function WorkerList() {
  const { workers, tasks, updateWorker } = useStore();
  const { isAdmin } = useAuthStore();
  const [editingWorkerId, setEditingWorkerId] = useState<string | null>(null);

  const getWorkerTaskCount = (workerId: string) => {
    return tasks.filter(task => task.assignedTo === workerId).length;
  };

  const getCompletedTaskCount = (workerId: string) => {
    return tasks.filter(task => task.assignedTo === workerId && task.status === 'Complete').length;
  };

  if (editingWorkerId) {
    const worker = workers.find(w => w.id === editingWorkerId);
    if (!worker) return null;

    return (
      <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
        <WorkerEditForm 
          worker={worker} 
          onSave={() => setEditingWorkerId(null)}
          onCancel={() => setEditingWorkerId(null)}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workers.map(worker => {
        const taskCount = getWorkerTaskCount(worker.id);
        const completedTasks = getCompletedTaskCount(worker.id);
        
        return (
          <div key={worker.id} className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-200">{worker.name}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  worker.active ? 'bg-emerald-500' : 'bg-gray-500'
                } text-white`}>
                  {worker.active ? 'Active' : 'Inactive'}
                </span>
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingWorkerId(worker.id)}
                    className="text-gray-100"
                  >
                    <Edit2 size={16} />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span className="text-sm">{worker.email}</span>
              </div>

              <div className="flex items-center text-gray-400">
                <Briefcase size={16} className="mr-2" />
                <span className="text-sm">{worker.role}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-400">
                  <CheckCircle size={16} className="mr-2 text-emerald-500" />
                  <span>{completedTasks} completed</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <XCircle size={16} className="mr-2 text-orange-500" />
                  <span>{taskCount - completedTasks} pending</span>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <Button
                  variant={worker.active ? 'warning' : 'success'}
                  size="sm"
                  className="w-full"
                  onClick={() => updateWorker(worker.id, { active: !worker.active })}
                >
                  {worker.active ? 'Deactivate Worker' : 'Activate Worker'}
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}