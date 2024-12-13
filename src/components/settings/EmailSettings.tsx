import React from 'react';
import { Button } from '../ui/Button';

export function EmailSettings() {
  const [emailConfig, setEmailConfig] = React.useState({
    host: '',
    port: '',
    username: '',
    password: '',
    fromEmail: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save email configuration
    console.log('Email config:', emailConfig);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Email Server Settings</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">SMTP Host</label>
              <input
                type="text"
                value={emailConfig.host}
                onChange={(e) => setEmailConfig({ ...emailConfig, host: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">SMTP Port</label>
              <input
                type="text"
                value={emailConfig.port}
                onChange={(e) => setEmailConfig({ ...emailConfig, port: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Username</label>
              <input
                type="text"
                value={emailConfig.username}
                onChange={(e) => setEmailConfig({ ...emailConfig, username: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
              <input
                type="password"
                value={emailConfig.password}
                onChange={(e) => setEmailConfig({ ...emailConfig, password: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-200 mb-1">From Email</label>
              <input
                type="email"
                value={emailConfig.fromEmail}
                onChange={(e) => setEmailConfig({ ...emailConfig, fromEmail: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
          </div>
          <Button type="submit">Save Settings</Button>
        </form>
      </div>
    </div>
  );
}