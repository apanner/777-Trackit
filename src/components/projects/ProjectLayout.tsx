import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectList } from './ProjectList';
import { ProjectDetails } from './ProjectDetails';
import { ProjectMetrics } from './ProjectMetrics';

export function ProjectLayout() {
  const { projectId } = useParams();

  return (
    <div className="space-y-6">
      <ProjectMetrics />
      
      <div className="flex gap-6">
        {/* Project List - 75% width */}
        <div className="flex-[3]">
          <ProjectList />
        </div>

        {/* Project Dashboard - 25% width */}
        <div className="flex-1">
          <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-4 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">Project Overview</h2>
            {projectId ? (
              <ProjectDetails projectId={projectId} />
            ) : (
              <p className="text-gray-400">Select a project to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}