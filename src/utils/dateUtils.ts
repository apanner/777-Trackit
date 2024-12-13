import { format, isValid } from 'date-fns';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Not set';
};

export const validateDateRange = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return isValid(start) && isValid(end) && start <= end;
};