import React from 'react';
import { cn } from '../../lib/utils';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
}

export function SettingsTabs({ activeTab, onTabChange, isAdmin }: SettingsTabsProps) {
  const tabs = [
    { id: 'projects', label: 'Projects', adminOnly: false },
    { id: 'users', label: 'Users', adminOnly: true },
    { id: 'email', label: 'Email', adminOnly: true },
    { id: 'system', label: 'System', adminOnly: true },
    { id: 'logs', label: 'System Logs', adminOnly: true },
  ];

  const visibleTabs = tabs.filter(tab => !tab.adminOnly || isAdmin);

  return (
    <div className="flex space-x-2 border-b border-gray-700">
      {visibleTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === tab.id
              ? 'text-emerald-500 border-emerald-500'
              : 'text-gray-400 border-transparent hover:text-gray-200'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}