import { useEffect, useState } from 'react';
import { useFirebaseStore } from '../store/useFirebaseStore';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFirebaseData() {
  const { initialize, loading } = useFirebaseStore();
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test connection by trying to fetch a document
        await getDocs(collection(db, 'users'));
        setConnectionStatus('Connected');
        console.log('✅ Successfully connected to Firestore');
        
        // Initialize store data
        await initialize();
        console.log('✅ Store data initialized');
      } catch (error) {
        console.error('❌ Firebase connection error:', error);
        setConnectionStatus('Connection failed');
      }
    };

    testConnection();
  }, [initialize]);

  return { loading, connectionStatus };
}