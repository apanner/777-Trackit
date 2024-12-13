import React from 'react';
import { FIREBASE_CONFIG } from '../../../config/firebase';
import { db } from '../../../lib/firebase';

interface DatabaseInfoProps {
  connectionStatus: string;
}

export function DatabaseInfo({ connectionStatus }: DatabaseInfoProps) {
  const dbInfo = {
    projectId: FIREBASE_CONFIG.projectId,
    databaseName: FIREBASE_CONFIG.databaseName,
    databaseURL: db.app.options.databaseURL || 'Using default',
    region: FIREBASE_CONFIG.region || 'us-central1'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <span className="text-gray-200">Connection Status</span>
        <span className={`px-3 py-1 rounded-full text-sm ${
          connectionStatus === 'Connected' 
            ? 'bg-green-500/10 text-green-500' 
            : 'bg-red-500/10 text-red-500'
        }`}>
          {connectionStatus}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <span className="text-gray-200">Project ID</span>
          <span className="text-gray-400">{dbInfo.projectId}</span>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <span className="text-gray-200">Database Name</span>
          <span className="text-gray-400">{dbInfo.databaseName}</span>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <span className="text-gray-200">Database URL</span>
          <span className="text-gray-400">{dbInfo.databaseURL}</span>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <span className="text-gray-200">Region</span>
          <span className="text-gray-400">{dbInfo.region}</span>
        </div>
      </div>
    </div>
  );
}