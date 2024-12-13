import React from 'react';
import { ProjectMetrics } from './ProjectMetrics';
import { ProjectList } from './ProjectList';

export function ProjectDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Projects</h2>
      </div>

      <ProjectMetrics />
      <ProjectList />
    </div>
  );
}