import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { Button } from '../ui/Button';
import { Calendar as CalendarIcon, Clock, CalendarDays } from 'lucide-react';

type ViewType = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

export function CalendarView() {
  const [view, setView] = useState<ViewType>('dayGridMonth');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-100">Calendar</h2>
        <div className="flex space-x-2">
          <Button
            variant={view === 'timeGridDay' ? 'default' : 'outline'}
            onClick={() => setView('timeGridDay')}
            className="flex items-center space-x-2"
          >
            <Clock size={16} />
            <span>Day</span>
          </Button>
          <Button
            variant={view === 'timeGridWeek' ? 'default' : 'outline'}
            onClick={() => setView('timeGridWeek')}
            className="flex items-center space-x-2"
          >
            <CalendarDays size={16} />
            <span>Week</span>
          </Button>
          <Button
            variant={view === 'dayGridMonth' ? 'default' : 'outline'}
            onClick={() => setView('dayGridMonth')}
            className="flex items-center space-x-2"
          >
            <CalendarIcon size={16} />
            <span>Month</span>
          </Button>
        </div>
      </div>
      <Calendar view={view} />
    </div>
  );
}