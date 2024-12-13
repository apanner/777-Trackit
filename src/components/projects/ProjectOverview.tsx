import React from 'react';
import { ProjectMetrics } from './ProjectMetrics';
import { ProjectGrid } from './ProjectGrid';
import { ProjectForm } from './ProjectForm';
import { useAuthStore } from '../../store/useAuthStore';

export function ProjectOverview() {
  const { isAdmin } = useAuthStore();
  const [showNewProject, setShowNewProject] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Projects</h2>
        {isAdmin && (
          <button
            onClick={() => setShowNewProject(!showNewProject)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {showNewProject ? 'Cancel' : 'New Project'}
          </button>
        )}
      </div>

      <ProjectMetrics />
      
      {showNewProject && isAdmin && (
        <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Create New Project</h3>
          <ProjectForm onSuccess={() => setShowNewProject(false)} />
        </div>
      )}

      <ProjectGrid />
    </div>
  );
}