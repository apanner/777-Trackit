import React from 'react';
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#1a1a1a] border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="py-4 px-4">
          <h1 className="text-4xl font-bold text-center flex items-center justify-center">
            <Activity className="text-emerald-400 mr-2" />
            <span className="text-emerald-400">777-Trackit</span>
          </h1>
        </div>
      </div>
    </header>
  );
}