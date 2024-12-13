import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';
import { Lock } from 'lucide-react';

export function AdminLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAdmin, logout } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      setIsOpen(false);
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (isAdmin) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={logout}
        className="flex items-center space-x-2 text-gray-100"
      >
        <Lock size={16} />
        <span>Logout Admin</span>
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 text-gray-100"
      >
        <Lock size={16} />
        <span>Admin Access</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Admin Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-200">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="text-gray-100">
                  Cancel
                </Button>
                <Button type="submit" className="text-gray-100">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}