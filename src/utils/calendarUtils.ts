import { EventInput } from '@fullcalendar/core';
import { Task, Worker } from '../types';
import { getTaskColor } from './taskUtils';

export function createCalendarEvents(tasks: Task[], workers: Worker[]): EventInput[] {
  // Group tasks by date to assign different colors
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = task.startDate.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return tasks.map(task => {
    const date = task.startDate.split('T')[0];
    const tasksOnSameDay = tasksByDate[date];
    const taskIndex = tasksOnSameDay.findIndex(t => t.id === task.id);
    const worker = workers.find(w => w.id === task.assignedTo);
    
    return {
      id: task.id,
      title: task.title,
      start: task.startDate,
      end: task.endDate,
      backgroundColor: getTaskColor(taskIndex),
      borderColor: getTaskColor(taskIndex),
      textColor: '#ffffff',
      extendedProps: {
        description: task.description,
        assignedTo: worker?.name || 'Unassigned',
        priority: task.priority,
        status: task.status
      }
    };
  });
}