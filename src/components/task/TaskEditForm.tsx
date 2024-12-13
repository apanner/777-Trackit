import React, { useState } from 'react';
import { Task } from '../../types';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { validateDateRange } from '../../utils/dateUtils';

interface TaskEditFormProps {
  task: Task;
  onSave: () => void;
  onCancel: () => void;
}

export function TaskEditForm({ task, onSave, onCancel }: TaskEditFormProps) {
  const { projects, workers, updateTask } = useStore();
  const [formData, setFormData] = useState({
    projectId: task.projectId,
    title: task.title,
    description: task.description,
    startDate: task.startDate.split('T')[0],
    endDate: task.endDate.split('T')[0],
    assignedTo: task.assignedTo,
    priority: task.priority,
    status: task.status,
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
      updateTask(task.id, {
        ...formData,
        updatedAt: new Date().toISOString(),
      });
      onSave();
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-200">Project</label>
        <select
          value={formData.projectId}
          onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          required
        >
          {projects.map((project) => (
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
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Assigned To</label>
          <select
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
            required
          >
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Complete">Complete</option>
            <option value="Extended">Extended</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}