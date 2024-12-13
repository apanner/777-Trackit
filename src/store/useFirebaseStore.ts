import { create } from 'zustand';
import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, Task, Project, Note } from '../types';

interface FirebaseStore {
  loading: boolean;
  users: User[];
  tasks: Task[];
  projects: Project[];
  notes: Note[];
  
  // Initialize
  initialize: () => Promise<void>;
  
  // User actions
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  
  // Task actions
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  
  // Project actions
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  // Note actions
  addNote: (note: Omit<Note, 'id'>) => Promise<void>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getTaskNotes: (taskId: string) => Promise<Note[]>;
}

export const useFirebaseStore = create<FirebaseStore>((set, get) => ({
  loading: true,
  users: [],
  tasks: [],
  projects: [],
  notes: [],

  initialize: async () => {
    try {
      // Load all data from Firebase
      const [usersSnap, tasksSnap, projectsSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'tasks')),
        getDocs(collection(db, 'projects'))
      ]);

      set({
        users: usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as User)),
        tasks: tasksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)),
        projects: projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)),
        loading: false
      });
    } catch (error) {
      console.error('Error initializing data:', error);
      set({ loading: false });
    }
  },

  // User actions
  addUser: async (userData) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      const newUser = { id: docRef.id, ...userData };
      set(state => ({ users: [...state.users, newUser] }));
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  updateUser: async (id, updates) => {
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      set(state => ({
        users: state.users.map(user => 
          user.id === id ? { ...user, ...updates } : user
        )
      }));
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      set(state => ({
        users: state.users.filter(user => user.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Task actions
  addTask: async (taskData) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      const newTask = { id: docRef.id, ...taskData };
      set(state => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  updateTask: async (id, updates) => {
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, ...updates } : task
        )
      }));
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Project actions
  addProject: async (projectData) => {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      const newProject = { id: docRef.id, ...projectData };
      set(state => ({ projects: [...state.projects, newProject] }));
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  },

  updateProject: async (id, updates) => {
    try {
      const projectRef = doc(db, 'projects', id);
      await updateDoc(projectRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      set(state => ({
        projects: state.projects.map(project => 
          project.id === id ? { ...project, ...updates } : project
        )
      }));
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  deleteProject: async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      set(state => ({
        projects: state.projects.filter(project => project.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Note actions
  addNote: async (noteData) => {
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        ...noteData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      const newNote = { id: docRef.id, ...noteData };
      set(state => ({ notes: [...state.notes, newNote] }));
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  },

  updateNote: async (id, updates) => {
    try {
      const noteRef = doc(db, 'notes', id);
      await updateDoc(noteRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      set(state => ({
        notes: state.notes.map(note => 
          note.id === id ? { ...note, ...updates } : note
        )
      }));
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  deleteNote: async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
      set(state => ({
        notes: state.notes.filter(note => note.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },

  getTaskNotes: async (taskId) => {
    try {
      const q = query(
        collection(db, 'notes'),
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
  }
}));