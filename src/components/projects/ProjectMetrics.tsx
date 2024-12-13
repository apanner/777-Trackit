import React from 'react';
import { useStore } from '../../store/useStore';
import { Briefcase, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export function ProjectMetrics() {
  const { projects, tasks } = useStore();

  const metrics = {
    total: projects.length,
    active: projects.filter(p => p.status === 'Active').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    onHold: projects.filter(p => p.status === 'On Hold').length,
  };

  const getProjectTaskCount = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId).length;
  };

  const totalTasks = projects.reduce((acc, project) => {
    return acc + getProjectTaskCount(project.id);
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Total Projects</p>
            <p className="text-2xl font-semibold text-gray-100 mt-1">{metrics.total}</p>
          </div>
          <Briefcase className="text-emerald-500" size={24} />
        </div>
        <p className="text-sm text-gray-400 mt-2">Total Tasks: {totalTasks}</p>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Active Projects</p>
            <p className="text-2xl font-semibold text-blue-400 mt-1">{metrics.active}</p>
          </div>
          <Clock className="text-blue-500" size={24} />
        </div>
        <p className="text-sm text-gray-400 mt-2">In Progress</p>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Completed</p>
            <p className="text-2xl font-semibold text-green-400 mt-1">{metrics.completed}</p>
          </div>
          <CheckCircle className="text-green-500" size={24} />
        </div>
        <p className="text-sm text-gray-400 mt-2">Successfully Delivered</p>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">On Hold</p>
            <p className="text-2xl font-semibold text-orange-400 mt-1">{metrics.onHold}</p>
          </div>
          <AlertCircle className="text-orange-500" size={24} />
        </div>
        <p className="text-sm text-gray-400 mt-2">Pending Review</p>
      </div>
    </div>
  );
}