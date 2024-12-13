import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface UserFormProps {
  onSuccess?: () => void;
}

export function UserForm({ onSuccess }: UserFormProps) {
  const { addUser } = useStore();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = {
        ...formData,
        id: crypto.randomUUID(),
        active: true,
      };

      addUser(user);
      showToast('success', 'User added successfully');
      
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '',
      });

      onSuccess?.();
    } catch (err) {
      showToast('error', 'Failed to add user');
      console.error('Error adding user:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
          <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
            required
          >
            <option value="">Select Role</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
            <option value="QA">QA</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="w-full sm:w-auto">
          Add User
        </Button>
      </div>
    </form>
  );
}