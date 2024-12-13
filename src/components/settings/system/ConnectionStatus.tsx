import React from 'react';
import { useFirebaseConnection } from '../../../hooks/firebase/useFirebaseConnection';
import { FIREBASE_SETTINGS } from '../../../lib/firebase';

export function ConnectionStatus() {
  const { connectionStatus, error } = useFirebaseConnection();

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

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="text-red-500 text-sm">{error.message}</p>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <span className="text-gray-200">Database Name</span>
          <span className="text-gray-400">{FIREBASE_SETTINGS.databaseName}</span>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <span className="text-gray-200">Region</span>
          <span className="text-gray-400">{FIREBASE_SETTINGS.region}</span>
        </div>
      </div>
    </div>
  );
}