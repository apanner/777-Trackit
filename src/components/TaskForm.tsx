import React, { useCallback } from 'react';
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';

export function TaskForm() {
  const { workers, addTask } = useStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    assignedTo: '',
    priority: 'Medium' as const,
    status: 'New' as const,
  });

  const [attachments, setAttachments] = React.useState<Array<{
    id: string;
    file: File;
    preview: string;
  }>>([]);

  const validateDates = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return start <= end;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setAttachments((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
    },
    maxSize: 5242880, // 5MB
  });

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateDates()) {
      setError('End date must be after start date');
      return;
    }

    try {
      setIsSubmitting(true);

      const processedAttachments = attachments.map((att) => ({
        id: att.id,
        name: att.file.name,
        type: att.file.type,
        url: att.preview,
        size: att.file.size,
      }));

      const task = {
        ...formData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        attachments: processedAttachments,
      };

      addTask(task);

      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        assignedTo: '',
        priority: 'Medium',
        status: 'New',
      });
      setAttachments([]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-200">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-200">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
            required
            min={formData.startDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Assigned To</label>
          <select
            value={formData.assignedTo}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
            required
          >
            <option value="">Select Worker</option>
            {workers
              .filter((w) => w.active)
              .map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Attachments
        </label>
        <div
          {...getRootProps()}
          className={`p-4 border-2 border-dashed rounded-lg ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 bg-opacity-10'
              : 'border-gray-600'
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-center text-gray-400">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop files here, or click to select files'}
          </p>
          <p className="text-center text-gray-500 text-sm mt-1">
            Maximum file size: 5MB
          </p>
        </div>

        {attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            {attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center justify-between p-2 bg-gray-700 rounded"
              >
                <span className="text-sm text-gray-200">{att.file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(att.id)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Task...' : 'Create Task'}
      </Button>
    </form>
  );
}