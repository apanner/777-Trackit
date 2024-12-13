import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { SettingsTabs } from './SettingsTabs';
import { SettingsContent } from './SettingsContent';

export function Settings() {
  const { isAdmin } = useAuthStore();
  const [activeTab, setActiveTab] = React.useState('projects');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-100">Settings</h2>
      
      <div className="space-y-6">
        <SettingsTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isAdmin={isAdmin}
        />
        <SettingsContent 
          activeTab={activeTab}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
}