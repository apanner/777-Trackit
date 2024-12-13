import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { formatDate } from '../../utils/dateUtils';
import { getProjectStatusColor } from '../../utils/projectUtils';
import { Calendar, Users, ListTodo } from 'lucide-react';

export function ProjectList() {
  const { projects, tasks } = useStore();

  const getProjectTaskCount = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId).length;
  };

  const getProjectProgress = (projectId: string) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter(task => task.status === 'Complete').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          className="block bg-[#1e1e1e] rounded-lg border border-gray-700 hover:border-emerald-500 transition-colors"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-100">{project.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full text-white ${getProjectStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm">{formatDate(project.startDate)}</span>
              </div>

              <div className="flex items-center text-gray-400">
                <ListTodo size={16} className="mr-2" />
                <span className="text-sm">{getProjectTaskCount(project.id)} Tasks</span>
              </div>

              <div className="flex items-center text-gray-400">
                <Users size={16} className="mr-2" />
                <span className="text-sm">{project.category || 'No Category'}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progress</span>
                <span>{getProjectProgress(project.id)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-emerald-500 rounded-full h-2 transition-all"
                  style={{ width: `${getProjectProgress(project.id)}%` }}
                />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}