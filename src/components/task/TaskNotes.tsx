import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/useAuthStore';
import { format } from 'date-fns';
import { Button } from '../ui/Button';
import { Send } from 'lucide-react';

interface TaskNotesProps {
  taskId: string;
}

export function TaskNotes({ taskId }: TaskNotesProps) {
  const { tasks, workers, updateTask } = useStore();
  const { currentUser } = useAuthStore();
  const [newNote, setNewNote] = useState('');
  
  const task = tasks.find(t => t.id === taskId);
  
  const handleAddNote = () => {
    if (!task || !newNote.trim()) return;
    
    const note = {
      id: crypto.randomUUID(),
      taskId,
      userId: currentUser?.id || 'system',
      content: newNote,
      createdAt: new Date().toISOString(),
    };
    
    updateTask(taskId, {
      notes: [...(task.notes || []), note],
    });
    
    setNewNote('');
  };

  if (!task) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-200 mb-2">Notes</h4>
      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
        {task.notes?.map((note) => {
          const worker = workers.find(w => w.id === note.userId);
          return (
            <div key={note.id} className="bg-gray-700 rounded p-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{worker?.name || 'System'}</span>
                <span>{format(new Date(note.createdAt), 'MMM d, yyyy HH:mm')}</span>
              </div>
              <p className="text-sm text-gray-200">{note.content}</p>
            </div>
          );
        })}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          className="flex-1 bg-gray-700 border-gray-600 rounded px-3 py-2 text-gray-200"
          onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
        />
        <Button onClick={handleAddNote} disabled={!newNote.trim()}>
          <Send size={16} className="mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
}