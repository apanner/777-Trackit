import React from 'react';
import { Button } from '../ui/Button';
import { Calendar as CalendarIcon, Clock, CalendarDays } from 'lucide-react';

interface CalendarHeaderProps {
  view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
  onViewChange: (view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay') => void;
}

export function CalendarHeader({ view, onViewChange }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-100">Calendar</h2>
      <div className="flex space-x-2">
        <Button
          variant={view === 'timeGridDay' ? 'default' : 'outline'}
          onClick={() => onViewChange('timeGridDay')}
          className="flex items-center space-x-2"
        >
          <Clock size={16} />
          <span>Day</span>
        </Button>
        <Button
          variant={view === 'timeGridWeek' ? 'default' : 'outline'}
          onClick={() => onViewChange('timeGridWeek')}
          className="flex items-center space-x-2"
        >
          <CalendarDays size={16} />
          <span>Week</span>
        </Button>
        <Button
          variant={view === 'dayGridMonth' ? 'default' : 'outline'}
          onClick={() => onViewChange('dayGridMonth')}
          className="flex items-center space-x-2"
        >
          <CalendarIcon size={16} />
          <span>Month</span>
        </Button>
      </div>
    </div>
  );
}