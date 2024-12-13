import React from 'react';
import { TaskListByProject } from './TaskListByProject';
import { TaskForm } from './TaskForm';
import { useAuthStore } from '../../store/useAuthStore';

export function TaskListView() {
  const { isAdmin } = useAuthStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {isAdmin && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Create Task</h2>
          <TaskForm />
        </div>
      )}
      <div className={isAdmin ? '' : 'lg:col-span-2'}>
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Task List</h2>
        <TaskListByProject isAdmin={isAdmin} />
      </div>
    </div>
  );
}