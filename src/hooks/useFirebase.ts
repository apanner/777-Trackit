import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { mapFirebaseUserToUser } from '../services/firebase/auth';
import { useAuthStore } from '../store/useAuthStore';

export function useFirebase() {
  const [loading, setLoading] = useState(true);
  const { setCurrentUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = mapFirebaseUserToUser(firebaseUser);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setCurrentUser]);

  return { loading };
}