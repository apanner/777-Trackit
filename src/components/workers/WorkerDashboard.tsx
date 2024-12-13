import React from 'react';
import { useStore } from '../../store/useStore';
import { WorkerMetrics } from './WorkerMetrics';
import { WorkerList } from './WorkerList';

export function WorkerDashboard() {
  const { workers } = useStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-100">Workers</h2>
      <WorkerMetrics />
      <WorkerList />
    </div>
  );
}