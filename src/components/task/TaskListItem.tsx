import React, { useState } from 'react';
import { format } from 'date-fns';
import { Task } from '../../types';
import { TaskNotes } from './TaskNotes';
import { TaskActions } from './TaskActions';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/useAuthStore';
import { getPriorityColor } from '../../utils/taskUtils';
import { ChevronDown, ChevronUp, Edit2, Briefcase } from 'lucide-react';
import { Button } from '../ui/Button';
import { TaskEditForm } from './TaskEditForm';

interface TaskListItemProps {
  task: Task;
  isAdmin: boolean;
}

export function TaskListItem({ task, isAdmin }: TaskListItemProps) {
  const { workers, projects, updateTask } = useStore();
  const { currentUser } = useAuthStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const worker = workers.find(w => w.id === task.assignedTo);
  const project = projects.find(p => p.id === task.projectId);
  const isOwnTask = currentUser?.id === task.assignedTo;

  const handleStatusChange = (status: string) => {
    updateTask(task.id, { 
      status,
      completedAt: status === 'Complete' ? new Date().toISOString() : undefined
    });
  };

  if (isEditing && isAdmin) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <TaskEditForm 
          task={task} 
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-750 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {isExpanded ? (
              <ChevronUp className="text-gray-400" size={20} />
            ) : (
              <ChevronDown className="text-gray-400" size={20} />
            )}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Briefcase className="text-emerald-500" size={16} />
                <span className="text-sm text-emerald-500 font-medium">
                  {project?.name || 'No Project'}
                </span>
              </div>
              <h4 className="font-medium text-gray-200">{task.title}</h4>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`px-2 py-1 text-xs rounded ${
              task.status === 'Complete' ? 'bg-green-500' : 
              task.status === 'In Progress' ? 'bg-blue-500' : 
              task.status === 'Extended' ? 'bg-orange-500' :
              'bg-gray-500'
            } text-white`}>
              {task.status}
            </span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-700">
          <div className="space-y-4">
            <p className="text-gray-400">{task.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <div>
                <span className="font-medium">Assigned to:</span>{' '}
                {worker?.name || 'Unassigned'}
              </div>
              <div>
                <span className="font-medium">Due:</span>{' '}
                {format(new Date(task.endDate), 'MMM dd, yyyy')}
              </div>
              <div>
                <span className="font-medium">Start Date:</span>{' '}
                {format(new Date(task.startDate), 'MMM dd, yyyy')}
              </div>
              <div>
                <span className="font-medium">Created:</span>{' '}
                {format(new Date(task.createdAt), 'MMM dd, yyyy')}
              </div>
            </div>

            {task.attachments && task.attachments.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-200 mb-2">Attachments</h5>
                <div className="flex flex-wrap gap-2">
                  {task.attachments.map(attachment => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300"
                    >
                      {attachment.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <TaskNotes taskId={task.id} />

            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit Task
                </Button>
              )}
              
              {(isAdmin || isOwnTask) && (
                <TaskActions
                  task={task}
                  onStatusChange={handleStatusChange}
                  isAdmin={isAdmin}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}