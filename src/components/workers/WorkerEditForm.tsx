import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Worker } from '../../types';

interface WorkerEditFormProps {
  worker: Worker;
  onSave: () => void;
  onCancel: () => void;
}

export function WorkerEditForm({ worker, onSave, onCancel }: WorkerEditFormProps) {
  const { updateWorker } = useStore();
  const [formData, setFormData] = useState({
    name: worker.name,
    email: worker.email,
    role: worker.role,
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const updates: Partial<Worker> = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      if (formData.password) {
        updates.password = formData.password;
      }

      updateWorker(worker.id, updates);
      onSave();
    } catch (err) {
      setError('Failed to update worker. Please try again.');
      console.error('Error updating worker:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            New Password (leave blank to keep current)
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            placeholder="Enter new password"
          />
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