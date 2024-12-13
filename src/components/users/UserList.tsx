import React from 'react';
import { useStore } from '../../store/useStore';
import { User } from 'lucide-react';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { useToast } from '../../hooks/useToast';

export function UserList() {
  const { users, tasks, updateUser, deleteUser } = useStore();
  const { showToast } = useToast();
  const [confirmDelete, setConfirmDelete] = React.useState<string | null>(null);

  const getUserTaskCount = (userId: string) => {
    return tasks.filter(task => task.assignedTo === userId).length;
  };

  const handleStatusChange = (userId: string, active: boolean) => {
    updateUser(userId, { active });
    showToast('success', `User ${active ? 'activated' : 'deactivated'} successfully`);
  };

  const handleDelete = (userId: string) => {
    deleteUser(userId);
    showToast('success', 'User deleted successfully');
    setConfirmDelete(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map(user => (
        <div key={user.id} className="bg-[#1e1e1e] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="text-gray-300" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.role}</p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              user.active ? 'bg-emerald-500' : 'bg-gray-500'
            } text-white`}>
              {user.active ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-sm text-gray-400">
              Assigned Tasks: {getUserTaskCount(user.id)}
            </p>
          </div>

          <div className="flex space-x-2">
            <Button
              variant={user.active ? 'warning' : 'success'}
              size="sm"
              className="flex-1"
              onClick={() => handleStatusChange(user.id, !user.active)}
            >
              {user.active ? 'Deactivate' : 'Activate'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setConfirmDelete(user.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      {confirmDelete && (
        <ConfirmDialog
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone."
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}