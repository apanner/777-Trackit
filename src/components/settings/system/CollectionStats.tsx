import React from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { FIREBASE_COLLECTION_NAMES } from '../../../config/firebase';

export function CollectionStats() {
  const [stats, setStats] = React.useState({
    users: 0,
    tasks: 0,
    projects: 0,
    notes: 0,
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      const results = await Promise.all(
        Object.values(FIREBASE_COLLECTION_NAMES).map(async (collectionName) => {
          const coll = collection(db, collectionName);
          const snapshot = await getCountFromServer(coll);
          return { [collectionName]: snapshot.data().count };
        })
      );

      setStats(
        results.reduce((acc, curr) => ({ ...acc, ...curr }), {})
      );
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-3">
      <h4 className="text-lg font-medium text-gray-200 mb-3">Collection Statistics</h4>
      
      {Object.entries(stats).map(([collection, count]) => (
        <div key={collection} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <span className="text-gray-200 capitalize">{collection}</span>
          <span className="text-gray-400">{count} documents</span>
        </div>
      ))}
    </div>
  );
}