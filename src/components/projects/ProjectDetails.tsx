import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { formatDate } from '../../utils/dateUtils';
import { Calendar, Users, AlertCircle, CheckCircle, Clock, Edit2, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProjectEditForm } from './ProjectEditForm';
import { ProjectTaskList } from './ProjectTaskList';
import { useAuthStore } from '../../store/useAuthStore';

export function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, tasks } = useStore();
  const { isAdmin } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Project not found</p>
        <Button variant="outline" onClick={() => navigate('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    );
  }

  const projectTasks = tasks.filter(task => task.projectId === projectId);
  const metrics = {
    total: projectTasks.length,
    inProgress: projectTasks.filter(t => t.status === 'In Progress').length,
    review: projectTasks.filter(t => t.status === 'Review').length,
    completed: projectTasks.filter(t => t.status === 'Complete').length,
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setIsEditing(false)}
          className="flex items-center space-x-2"
        >
          <ArrowLeft size={16} />
          <span>Back to Project</span>
        </Button>
        
        <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Edit Project</h3>
          <ProjectEditForm project={project} onClose={() => setIsEditing(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/projects')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Button>
        
        {isAdmin && (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2"
          >
            <Edit2 size={16} />
            <span>Edit Project</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
            <h1 className="text-2xl font-bold text-gray-100 mb-4">{project.name}</h1>
            <p className="text-gray-400 mb-6">{project.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Calendar size={16} className="mr-2" />
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p>{formatDate(project.startDate)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Calendar size={16} className="mr-2" />
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p>{formatDate(project.endDate)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Users size={16} className="mr-2" />
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p>{project.category || 'Uncategorized'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <AlertCircle size={16} className="mr-2" />
                  <div>
                    <p className="text-sm font-medium">Priority</p>
                    <p>{project.priority}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Project Tasks</h2>
            <ProjectTaskList projectId={project.id} />
          </div>
        </div>

        {/* Project Metrics */}
        <div className="space-y-4">
          <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Project Status</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded">
                <div className="flex items-center space-x-3">
                  <Clock className="text-blue-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">In Progress</p>
                    <p className="text-xl font-semibold text-gray-200">{metrics.inProgress}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="text-orange-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">In Review</p>
                    <p className="text-xl font-semibold text-gray-200">{metrics.review}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Completed</p>
                    <p className="text-xl font-semibold text-gray-200">
                      {metrics.completed} / {metrics.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Overall Progress</span>
                <span>{Math.round((metrics.completed / metrics.total) * 100) || 0}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-emerald-500 rounded-full h-2 transition-all"
                  style={{ 
                    width: `${Math.round((metrics.completed / metrics.total) * 100) || 0}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}