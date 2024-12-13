import React from 'react';
import { ProjectSettings } from './ProjectSettings';
import { UserSettings } from './UserSettings';
import { EmailSettings } from './EmailSettings';
import { SystemSettings } from './SystemSettings';
import { LogViewer } from './LogViewer';

interface SettingsContentProps {
  activeTab: string;
  isAdmin: boolean;
}

export function SettingsContent({ activeTab, isAdmin }: SettingsContentProps) {
  if (!isAdmin && activeTab !== 'projects') {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">You need administrator access to view this section.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {activeTab === 'projects' && <ProjectSettings />}
      {activeTab === 'users' && isAdmin && <UserSettings />}
      {activeTab === 'email' && isAdmin && <EmailSettings />}
      {activeTab === 'system' && isAdmin && <SystemSettings />}
      {activeTab === 'logs' && isAdmin && <LogViewer />}
    </div>
  );
}