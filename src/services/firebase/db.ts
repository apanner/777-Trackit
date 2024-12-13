import { 
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { User, Task, Project } from '../../types';

// Users Collection
export const usersCollection = collection(db, 'users');
export const tasksCollection = collection(db, 'tasks');
export const projectsCollection = collection(db, 'projects');

// User Operations
export const createUser = async (userData: Omit<User, 'id'>) => {
  try {
    const docRef = await addDoc(usersCollection, {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { id: docRef.id, ...userData };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Task Operations
export const createTask = async (taskData: Omit<Task, 'id'>) => {
  try {
    const docRef = await addDoc(tasksCollection, {
      ...taskData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { id: docRef.id, ...taskData };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Project Operations
export const createProject = async (projectData: Omit<Project, 'id'>) => {
  try {
    const docRef = await addDoc(projectsCollection, {
      ...projectData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { id: docRef.id, ...projectData };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (projectId: string, updates: Partial<Project>) => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Query Operations
export const getUserTasks = async (userId: string) => {
  try {
    const q = query(tasksCollection, where('assignedTo', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user tasks:', error);
    throw error;
  }
};