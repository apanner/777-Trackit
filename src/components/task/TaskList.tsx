import React from 'react';
import { useStore } from '../../store/useStore';
import { TaskListItem } from './TaskListItem';
import { Task } from '../../types';

interface TaskListProps {
  tasks?: Task[];
  isAdmin: boolean;
}

export function TaskList({ tasks: propTasks, isAdmin }: TaskListProps) {
  const { tasks: storeTasks } = useStore();
  const tasks = propTasks || storeTasks;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}