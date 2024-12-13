import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Note } from '../../types';

export const notesCollection = collection(db, 'notes');

// Create a new note
export const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(notesCollection, {
      ...note,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { id: docRef.id, ...note };
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Update a note
export const updateNote = async (noteId: string, updates: Partial<Note>) => {
  try {
    const noteRef = doc(db, 'notes', noteId);
    await updateDoc(noteRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (noteId: string) => {
  try {
    const noteRef = doc(db, 'notes', noteId);
    await deleteDoc(noteRef);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

// Get all notes for a task
export const getTaskNotes = async (taskId: string) => {
  try {
    const q = query(
      notesCollection, 
      where('taskId', '==', taskId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Note));
  } catch (error) {
    console.error('Error getting task notes:', error);
    throw error;
  }
};