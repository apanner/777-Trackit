import React from 'react';
import { useStore } from '../../store/useStore';
import { Users, UserCheck, UserX, Briefcase } from 'lucide-react';

export function UserMetrics() {
  const { users, tasks } = useStore();

  const metrics = {
    total: users.length,
    active: users.filter(u => u.active).length,
    inactive: users.filter(u => !u.active).length,
  };

  const getUserTaskCount = (userId: string) => {
    return tasks.filter(task => task.assignedTo === userId).length;
  };

  const totalAssignedTasks = users.reduce((acc, user) => {
    return acc + getUserTaskCount(user.id);
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Total Users</p>
            <p className="text-2xl font-semibold text-gray-100 mt-1">{metrics.total}</p>
          </div>
          <Users className="text-emerald-500" size={24} />
        </div>
        <p className="text-sm text-gray-400 mt-2">Registered team members</p>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Active Users</p>
            <p className="text-2xl font-semibold text-blue-400 mt-1">{metrics.active}</p>
          </div>
          <UserCheck className="text-blue-500" size={24} />
        </div>
        <p className="text-sm text-gray-400 mt-2">Currently active</p>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Inactive Users</p>
            <p className="text-2xl font-semibold text-orange-400 mt-1">{metrics.inactive}</p>
          </div>
          <UserX className="text-orange-500" size={24} />
        </div>
        <p className="text-sm text-gray-400 mt-2">Currently inactive</p>
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">Assigned Tasks</p>
            <p className="text-2xl font-semibold text-purple-400 mt-1">{totalAssignedTasks}</p>
          </div>
          <Briefcase className="text-purple-500" size={24} />
        </div>
        <p className="text-sm text-gray-400 mt-2">Total tasks assigned</p>
      </div>
    </div>
  );
}