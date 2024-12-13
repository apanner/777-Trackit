import { useState } from 'react';
import { useStore } from '../store/useStore';

export function useTaskForm() {
  const { addTask } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    projectId: '', // Add project ID
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    assignedTo: '',
    priority: 'Medium' as const,
    status: 'New' as const,
    attachments: [] as Array<{ id: string; file: File; preview: string }>,
  });

  const validateDates = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return start <= end;
  };

  const removeAttachment = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.projectId) {
      setError('Please select a project');
      return;
    }

    if (!validateDates()) {
      setError('End date must be after start date');
      return;
    }

    try {
      setIsSubmitting(true);

      const processedAttachments = formData.attachments.map((att) => ({
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
        projectId: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        assignedTo: '',
        priority: 'Medium',
        status: 'New',
        attachments: [],
      });
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    attachments: formData.attachments,
    isSubmitting,
    error,
    handleSubmit,
    setFormData,
    removeAttachment,
  };
}