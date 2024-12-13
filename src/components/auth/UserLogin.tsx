import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';
import { User } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function UserLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { userLogin, currentUser, logout } = useAuthStore();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await userLogin(email, password);
      if (success) {
        setIsOpen(false);
        setEmail('');
        setPassword('');
        showToast('success', 'Login successful');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      showToast('error', 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast('success', 'Logged out successfully');
    } catch (err) {
      showToast('error', 'Logout failed');
    }
  };

  if (currentUser) {
    return (
      <Button 
        variant="outline" 
        onClick={handleLogout}
        className="flex items-center space-x-2 text-gray-100 min-w-[200px] justify-start active:scale-95 transform transition-transform"
      >
        <User size={16} />
        <div className="text-left">
          <span className="block">{currentUser.name}</span>
          <span className="block text-xs text-gray-400">{currentUser.email}</span>
        </div>
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 text-gray-100 min-w-[120px] active:scale-95 transform transition-transform"
      >
        <User size={16} />
        <span>Login</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-200">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsOpen(false)} 
                  className="text-gray-100 active:scale-95 transform transition-transform"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="text-gray-100 active:scale-95 transform transition-transform"
                >
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