import React from 'react';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { TaskList } from './task/TaskList';

export function MyTasks() {
  const { currentUser } = useAuthStore();
  const { tasks } = useStore();

  const myTasks = tasks.filter(task => task.assignedTo === currentUser?.id);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-100">My Tasks</h2>
      <TaskList tasks={myTasks} isAdmin={false} />
    </div>
  );
}