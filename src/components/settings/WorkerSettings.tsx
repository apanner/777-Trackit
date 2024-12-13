import React from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';

export function WorkerSettings() {
  const { workers, addWorker, updateWorker, deleteWorker } = useStore();
  const [workerForm, setWorkerForm] = React.useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorker({
      ...workerForm,
      id: crypto.randomUUID(),
      active: true,
    });
    setWorkerForm({ name: '', email: '', password: '', role: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1e1e1e] p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-gray-200 mb-4">Add Worker</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Name</label>
              <input
                type="text"
                value={workerForm.name}
                onChange={(e) => setWorkerForm({ ...workerForm, name: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
              <input
                type="email"
                value={workerForm.email}
                onChange={(e) => setWorkerForm({ ...workerForm, email: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
              <input
                type="password"
                value={workerForm.password}
                onChange={(e) => setWorkerForm({ ...workerForm, password: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">Role</label>
              <input
                type="text"
                value={workerForm.role}
                onChange={(e) => setWorkerForm({ ...workerForm, role: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-gray-600 rounded-md px-3 py-2 text-gray-200"
                required
              />
            </div>
          </div>
          <Button type="submit">Add Worker</Button>
        </form>
      </div>

      <div className="space-y-4">
        {workers.map((worker) => (
          <div
            key={worker.id}
            className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-200">{worker.name}</h4>
                <p className="text-sm text-gray-400">{worker.email}</p>
                <p className="text-sm text-gray-400">{worker.role}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateWorker(worker.id, { active: !worker.active })}
                >
                  {worker.active ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteWorker(worker.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}