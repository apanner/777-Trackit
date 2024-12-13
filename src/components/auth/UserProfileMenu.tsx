import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UserProfileMenu() {
  const { currentUser, isAdmin, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser && !isAdmin) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-100"
      >
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
          <User size={20} />
        </div>
        <div className="text-left">
          <div className="font-medium">
            {isAdmin ? 'admin' : currentUser?.name}
          </div>
          <div className="text-sm text-gray-400">
            {isAdmin ? 'admin_jbupxz72' : currentUser?.email}
          </div>
        </div>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-700 rounded-lg shadow-xl border border-gray-600 z-50">
          <div className="p-3 border-b border-gray-600">
            <div className="font-medium text-gray-100">
              {isAdmin ? 'admin' : currentUser?.name}
            </div>
            <div className="text-sm text-gray-400">
              {isAdmin ? 'admin_jbupxz72' : currentUser?.email}
            </div>
          </div>
          
          <div className="py-2">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Edit Profile
            </Link>
            
            {isAdmin && (
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-100 hover:bg-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={16} className="mr-2" />
                Settings
              </Link>
            )}
            
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-100 hover:bg-gray-600 transition-colors"
            >
              <LogOut size={16} className="mr-2" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}