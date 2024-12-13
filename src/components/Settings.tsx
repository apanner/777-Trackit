import React, { useState } from 'react';
import { ProjectSettings } from './settings/ProjectSettings';
import { UserSettings } from './settings/UserSettings';
import { EmailSettings } from './settings/EmailSettings';

export function Settings() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-100">Settings</h2>
      
      <div className="space-y-6">
        <div className="flex space-x-2 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'projects'
                ? 'text-emerald-500 border-emerald-500'
                : 'text-gray-400 border-transparent hover:text-gray-200'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'text-emerald-500 border-emerald-500'
                : 'text-gray-400 border-transparent hover:text-gray-200'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'email'
                ? 'text-emerald-500 border-emerald-500'
                : 'text-gray-400 border-transparent hover:text-gray-200'
            }`}
          >
            Email
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'projects' && <ProjectSettings />}
          {activeTab === 'users' && <UserSettings />}
          {activeTab === 'email' && <EmailSettings />}
        </div>
      </div>
    </div>
  );
}