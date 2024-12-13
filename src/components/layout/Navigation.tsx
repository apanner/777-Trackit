import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, ListTodo, Calendar as CalendarIcon, Users, Briefcase } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserProfileMenu } from '../auth/UserProfileMenu';
import { cn } from '../../lib/utils';

export function Navigation() {
  const { isAdmin, currentUser } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    cn(
      'flex items-center space-x-2 text-gray-100 transition-colors',
      isActive(path) ? 'text-emerald-400' : 'hover:text-emerald-400'
    );

  return (
    <nav className="bg-[#1e1e1e] border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-14 px-4">
          <div className="flex items-center space-x-8">
            {isAdmin && (
              <Link to="/" className={linkClass('/')}>
                <LayoutGrid size={20} />
                <span>Dashboard</span>
              </Link>
            )}
            <Link to="/projects" className={linkClass('/projects')}>
              <Briefcase size={20} />
              <span>Projects</span>
            </Link>
            <Link to="/tasks" className={linkClass('/tasks')}>
              <ListTodo size={20} />
              <span>Tasks</span>
            </Link>
            {currentUser && (
              <Link to="/my-tasks" className={linkClass('/my-tasks')}>
                <ListTodo size={20} />
                <span>My Tasks</span>
              </Link>
            )}
            {isAdmin && (
              <Link to="/users" className={linkClass('/users')}>
                <Users size={20} />
                <span>Users</span>
              </Link>
            )}
            <Link to="/calendar" className={linkClass('/calendar')}>
              <CalendarIcon size={20} />
              <span>Calendar</span>
            </Link>
          </div>
          <UserProfileMenu />
        </div>
      </div>
    </nav>
  );
}