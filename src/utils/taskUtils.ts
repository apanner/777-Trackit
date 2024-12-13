export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'High':
      return 'bg-red-500';
    case 'Medium':
      return 'bg-yellow-500';
    case 'Low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Complete':
      return 'bg-green-500';
    case 'In Progress':
      return 'bg-blue-500';
    case 'Extended':
      return 'bg-orange-500';
    case 'Review':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
}

// Array of colors for multiple tasks on the same day
const TASK_COLORS = [
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#6366F1', // Indigo
  '#F43F5E', // Rose
];

export function getTaskColor(index: number): string {
  return TASK_COLORS[index % TASK_COLORS.length];
}

export function extendTaskDuration(task: any, days: number = 1) {
  const endDate = new Date(task.endDate);
  endDate.setDate(endDate.getDate() + days);
  return {
    ...task,
    endDate: endDate.toISOString().split('T')[0],
    status: 'Extended'
  };
}