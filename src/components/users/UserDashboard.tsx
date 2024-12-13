import React from 'react';
import { UserList } from './UserList';
import { UserMetrics } from './UserMetrics';
import { Button } from '../ui/Button';
import { UserPlus } from 'lucide-react';
import { UserForm } from './UserForm';

export function UserDashboard() {
  const [showAddUser, setShowAddUser] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Users</h2>
        <Button
          onClick={() => setShowAddUser(!showAddUser)}
          className="flex items-center space-x-2"
        >
          <UserPlus size={20} />
          <span>{showAddUser ? 'Cancel' : 'Add User'}</span>
        </Button>
      </div>

      <UserMetrics />
      
      {showAddUser && (
        <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Add New User</h3>
          <UserForm onSuccess={() => setShowAddUser(false)} />
        </div>
      )}

      <UserList />
    </div>
  );
}