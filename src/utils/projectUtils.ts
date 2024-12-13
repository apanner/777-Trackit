export const getProjectStatusColor = (status: string): string => {
  switch (status) {
    case 'Active':
      return 'bg-blue-500';
    case 'Completed':
      return 'bg-green-500';
    case 'On Hold':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
};