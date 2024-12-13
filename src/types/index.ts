// Add Note interface
export interface Note {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Update Task interface to include notes
export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'New' | 'In Progress' | 'Review' | 'Complete' | 'Extended';
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
  }>;
  notes?: Note[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}