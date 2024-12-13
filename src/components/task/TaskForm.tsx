import React, { useCallback } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { useDropzone } from 'react-dropzone';
import { useTaskForm } from '../../hooks/useTaskForm';
import { TaskFormInputs } from './TaskFormInputs';
import { TaskFormAttachments } from './TaskFormAttachments';
import { useToast } from '../../hooks/useToast';

export function TaskForm() {
  const { addTask } = useStore();
  const { showToast } = useToast();
  const {
    formData,
    attachments,
    isSubmitting,
    error,
    handleSubmit,
    setFormData,
    removeAttachment,
  } = useTaskForm();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const preview = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          attachments: [
            ...prev.attachments,
            {
              id: crypto.randomUUID(),
              file,
              preview,
            },
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
  }, [setFormData]);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      showToast('success', 'Task created successfully');
    } catch (err) {
      showToast('error', 'Failed to create task');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
          {error}
        </div>
      )}

      <TaskFormInputs
        formData={formData}
        setFormData={setFormData}
      />

      <TaskFormAttachments
        attachments={attachments}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        removeAttachment={removeAttachment}
      />

      <Button
        type="submit"
        className="w-full active:scale-95 transform transition-transform"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Task...' : 'Create Task'}
      </Button>
    </form>
  );
}