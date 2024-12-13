import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { validateDateRange } from '../../utils/dateUtils';

interface ProjectFormProps {
  onSuccess?: () => void;
}

export function ProjectForm({ onSuccess }: ProjectFormProps) {
  const { addProject } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Active' as const,
    priority: 'Medium' as const,
    category: '',
    tags: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateDateRange(formData.startDate, formData.endDate)) {
      setError('End date must be after start date');
      return;
    }

    try {
      const project = {
        ...formData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addProject(project);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Active',
        priority: 'Medium',
        category: '',
        tags: '',
      });

      onSuccess?.();
    } catch (err) {
      setError('Failed to create project. Please try again.');
      console.error('Error creating project:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-200 mb-1">Project Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          >
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            placeholder="Comma-separated tags"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">Create Project</Button>
      </div>
    </form>
  );
}