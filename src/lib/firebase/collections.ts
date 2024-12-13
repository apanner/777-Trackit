import { collection } from 'firebase/firestore';
import { db } from './init';
import { FIREBASE_SETTINGS } from './config';

export const collections = {
  users: collection(db, FIREBASE_SETTINGS.collections.USERS),
  tasks: collection(db, FIREBASE_SETTINGS.collections.TASKS),
  projects: collection(db, FIREBASE_SETTINGS.collections.PROJECTS),
  notes: collection(db, FIREBASE_SETTINGS.collections.NOTES)
};