import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { getDocs, collection } from 'firebase/firestore';

export function useFirebaseConnection() {
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test connection by trying to fetch a document
        await getDocs(collection(db, 'users'));
        setConnectionStatus('Connected');
        setError(null);
      } catch (err) {
        setConnectionStatus('Connection failed');
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    };

    checkConnection();
  }, []);

  return { connectionStatus, error };
}