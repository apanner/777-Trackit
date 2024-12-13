import React from 'react';
import { User } from '../../types';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/useAuthStore';

interface TaskFormInputsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function TaskFormInputs({ formData, setFormData }: TaskFormInputsProps) {
  const { projects, users } = useStore();
  const { isAdmin } = useAuthStore();
  const activeProjects = projects.filter(p => p.status === 'Active');
  const activeUsers = users.filter(u => u.active);

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-200">Project</label>
        <select
          value={formData.projectId}
          onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          required
        >
          <option value="">Select Project</option>
          {activeProjects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-200">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
            required
            min={formData.startDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Assigned To</label>
          <select
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
            required
          >
            <option value="">Select User</option>
            {activeUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
    </>
  );
}