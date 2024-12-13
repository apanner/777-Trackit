import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStore } from '../../store/useStore';
import { useAuthStore } from '../../store/useAuthStore';
import { createCalendarEvents } from '../../utils/calendarUtils';
import { CalendarEvent } from './CalendarEvent';

interface CalendarProps {
  view: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
}

export function Calendar({ view }: CalendarProps) {
  const { tasks, workers } = useStore();
  const { currentUser, isAdmin } = useAuthStore();

  // Filter tasks based on user role
  const filteredTasks = tasks.filter(task => {
    if (isAdmin) {
      return true;
    }
    return task.assignedTo === currentUser?.id;
  });

  const events = createCalendarEvents(filteredTasks, workers);

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={view}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: ''
        }}
        events={events}
        eventContent={(eventInfo) => <CalendarEvent eventInfo={eventInfo} />}
        eventDidMount={(info) => {
          info.el.title = `${info.event.title}
Assigned to: ${info.event.extendedProps.assignedTo}
Priority: ${info.event.extendedProps.priority}
Status: ${info.event.extendedProps.status}`;
        }}
        height="auto"
        aspectRatio={1.8}
        themeSystem="standard"
        slotMinTime="06:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        nowIndicator={true}
        weekends={true}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '09:00',
          endTime: '17:00',
        }}
      />
    </div>
  );
}