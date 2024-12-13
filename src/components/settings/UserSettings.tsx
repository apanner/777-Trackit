import React from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';

export function UserSettings() {
  const { users, addUser, updateUser, deleteUser } = useStore();
  const [userForm, setUserForm] = React.useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      ...userForm,
      id: crypto.randomUUID(),
      active: true,
    });
    setUserForm({ name: '', email: '', password: '', role: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Add User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Name</label>
              <input
                type="text"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
              <input
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
              <input
                type="password"
                value={userForm.password}
                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Role</label>
              <input
                type="text"
                value={userForm.role}
                onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-200">{user.name}</h4>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-400">{user.role}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateUser(user.id, { active: !user.active })}
                >
                  {user.active ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}