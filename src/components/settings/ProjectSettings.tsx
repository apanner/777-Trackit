import React from 'react';
import { ProjectForm } from '../projects/ProjectForm';

export function ProjectSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Create New Project</h3>
        <ProjectForm />
      </div>
    </div>
  );
}