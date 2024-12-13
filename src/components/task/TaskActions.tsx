import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { CheckCircle, XCircle, AlertCircle, Plus, Minus } from 'lucide-react';
import { Task } from '../../types';
import { extendTaskDuration } from '../../utils/taskUtils';
import { useStore } from '../../store/useStore';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { useToast } from '../../hooks/useToast';

interface TaskActionsProps {
  task: Task;
  onStatusChange: (status: string) => void;
  isAdmin: boolean;
}

export function TaskActions({ task, onStatusChange, isAdmin }: TaskActionsProps) {
  const { updateTask } = useStore();
  const { showToast } = useToast();
  const [showConfirm, setShowConfirm] = useState<{
    type: 'complete' | 'extend' | 'reopen' | null;
    days?: number;
  }>({ type: null });

  const handleExtendTask = (days: number) => {
    const updatedTask = extendTaskDuration(task, days);
    updateTask(task.id, {
      endDate: updatedTask.endDate,
      status: updatedTask.status
    });
    showToast('success', `Task extended by ${days} day${days > 1 ? 's' : ''}`);
  };

  const handleStatusChange = (status: string) => {
    onStatusChange(status);
    showToast('success', `Task marked as ${status}`);
  };

  return (
    <>
      <div className="flex space-x-2">
        {task.status !== 'Complete' && (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => setShowConfirm({ type: 'complete' })}
              className="hover:bg-green-700 transition-colors"
            >
              <CheckCircle size={16} className="mr-1" />
              Complete
            </Button>
            <div className="flex space-x-1">
              <Button
                variant="warning"
                size="sm"
                onClick={() => setShowConfirm({ type: 'extend', days: 1 })}
                title="Extend by 1 day"
              >
                <Plus size={16} className="mr-1" />
                1 Day
              </Button>
              <Button
                variant="warning"
                size="sm"
                onClick={() => setShowConfirm({ type: 'extend', days: 7 })}
                title="Extend by 7 days"
              >
                <Plus size={16} className="mr-1" />
                7 Days
              </Button>
            </div>
          </>
        )}
        {task.status === 'Complete' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfirm({ type: 'reopen' })}
          >
            <XCircle size={16} className="mr-1" />
            Reopen
          </Button>
        )}
      </div>

      {showConfirm.type === 'complete' && (
        <ConfirmDialog
          title="Complete Task"
          message="Are you sure you want to mark this task as complete?"
          onConfirm={() => {
            handleStatusChange('Complete');
            setShowConfirm({ type: null });
          }}
          onCancel={() => setShowConfirm({ type: null })}
          confirmText="Complete"
        />
      )}

      {showConfirm.type === 'extend' && (
        <ConfirmDialog
          title="Extend Task"
          message={`Are you sure you want to extend this task by ${showConfirm.days} day${
            showConfirm.days! > 1 ? 's' : ''
          }?`}
          onConfirm={() => {
            handleExtendTask(showConfirm.days!);
            setShowConfirm({ type: null });
          }}
          onCancel={() => setShowConfirm({ type: null })}
          confirmText="Extend"
        />
      )}

      {showConfirm.type === 'reopen' && (
        <ConfirmDialog
          title="Reopen Task"
          message="Are you sure you want to reopen this task?"
          onConfirm={() => {
            handleStatusChange('In Progress');
            setShowConfirm({ type: null });
          }}
          onCancel={() => setShowConfirm({ type: null })}
          confirmText="Reopen"
        />
      )}
    </>
  );
}