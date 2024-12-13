import React from 'react';
import { ConnectionStatus } from './system/ConnectionStatus';
import { CollectionStats } from './system/CollectionStats';

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Firebase Connection Status</h3>
        <ConnectionStatus />
      </div>

      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <CollectionStats />
      </div>
    </div>
  );
}