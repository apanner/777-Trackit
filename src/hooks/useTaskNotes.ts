import { useState, useEffect } from 'react';
import { useFirebaseStore } from '../store/useFirebaseStore';
import { Note } from '../types';
import { useToast } from './useToast';

export function useTaskNotes(taskId: string) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { addNote, updateNote, deleteNote, getTaskNotes } = useFirebaseStore();
  const { showToast } = useToast();

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const taskNotes = await getTaskNotes(taskId);
        setNotes(taskNotes);
      } catch (error) {
        console.error('Error loading notes:', error);
        showToast('error', 'Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [taskId, getTaskNotes, showToast]);

  const addNewNote = async (content: string, userId: string) => {
    try {
      await addNote({
        taskId,
        userId,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      showToast('success', 'Note added successfully');
    } catch (error) {
      console.error('Error adding note:', error);
      showToast('error', 'Failed to add note');
    }
  };

  const updateExistingNote = async (noteId: string, content: string) => {
    try {
      await updateNote(noteId, { content });
      showToast('success', 'Note updated successfully');
    } catch (error) {
      console.error('Error updating note:', error);
      showToast('error', 'Failed to update note');
    }
  };

  const deleteExistingNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      showToast('success', 'Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
      showToast('error', 'Failed to delete note');
    }
  };

  return {
    notes,
    loading,
    addNote: addNewNote,
    updateNote: updateExistingNote,
    deleteNote: deleteExistingNote
  };
}