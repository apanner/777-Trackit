import React from 'react';
import { X } from 'lucide-react';

interface TaskFormAttachmentsProps {
  attachments: Array<{ id: string; file: File; preview: string }>;
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
  removeAttachment: (id: string) => void;
}

export function TaskFormAttachments({
  attachments,
  getRootProps,
  getInputProps,
  isDragActive,
  removeAttachment,
}: TaskFormAttachmentsProps) {
  return (
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
  );
}