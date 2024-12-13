import React from 'react';
import { useStore } from '../store/useStore';
import { format, isAfter } from 'date-fns';
import { Clipboard, AlertCircle, Clock } from 'lucide-react';
import { TaskCard } from './task/TaskCard';

export function Dashboard() {
  const { tasks } = useStore();

  const todayTasks = tasks.filter(
    (t) => {
      const taskDate = new Date(t.endDate);
      const today = new Date();
      return format(taskDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
    }
  );

  const overdueTasks = tasks.filter(
    (t) =>
      new Date(t.endDate) < new Date(new Date().setHours(0, 0, 0, 0)) &&
      t.status !== 'Complete'
  );

  const extendedTasks = tasks.filter(
    (t) => t.status === 'Extended' && !isAfter(new Date(), new Date(t.endDate))
  );

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'Complete').length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    extended: extendedTasks.length,
    dueToday: todayTasks.length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-6 rounded-lg bg-[#1e1e1e] border border-gray-800 shadow-lg">
          <h3 className="text-lg font-medium text-gray-200">Total Tasks</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-100">
            {stats.total}
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-[#1e1e1e] border border-gray-800 shadow-lg">
          <h3 className="text-lg font-medium text-gray-200">In Progress</h3>
          <p className="mt-2 text-3xl font-semibold text-yellow-500">
            {stats.inProgress}
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-[#1e1e1e] border border-gray-800 shadow-lg">
          <h3 className="text-lg font-medium text-gray-200">Completed</h3>
          <p className="mt-2 text-3xl font-semibold text-emerald-500">
            {stats.completed}
          </p>
        </div>
        
        <div className="p-6 rounded-lg bg-[#1e1e1e] border border-gray-800 shadow-lg">
          <h3 className="text-lg font-medium text-gray-200">Extended</h3>
          <p className="mt-2 text-3xl font-semibold text-orange-500">
            {stats.extended}
          </p>
        </div>

        <div className="p-6 rounded-lg bg-[#1e1e1e] border border-gray-800 shadow-lg">
          <h3 className="text-lg font-medium text-gray-200">Due Today</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-500">
            {stats.dueToday}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="bg-[#1e1e1e] rounded-lg p-4 border border-gray-800 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Clipboard className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-200">Due Today</h2>
          </div>
          <div className="space-y-3">
            {todayTasks.length === 0 ? (
              <p className="text-gray-400">No tasks due today</p>
            ) : (
              todayTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>

        {/* Extended Tasks */}
        <div className="bg-[#1e1e1e] rounded-lg p-4 border border-gray-800 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-200">Extended Tasks</h2>
          </div>
          <div className="space-y-3">
            {extendedTasks.length === 0 ? (
              <p className="text-gray-400">No extended tasks</p>
            ) : (
              extendedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="bg-[#1e1e1e] rounded-lg p-4 border border-gray-800 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="text-red-500" />
            <h2 className="text-xl font-semibold text-gray-200">Overdue</h2>
          </div>
          <div className="space-y-3">
            {overdueTasks.length === 0 ? (
              <p className="text-gray-400">No overdue tasks</p>
            ) : (
              overdueTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}