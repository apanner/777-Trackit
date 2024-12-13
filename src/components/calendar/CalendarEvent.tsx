import React from 'react';
import { EventContentArg } from '@fullcalendar/core';

interface CalendarEventProps {
  eventInfo: EventContentArg;
}

export function CalendarEvent({ eventInfo }: CalendarEventProps) {
  return (
    <div className="p-1">
      <div className="font-semibold truncate">{eventInfo.event.title}</div>
      <div className="text-xs truncate">{eventInfo.event.extendedProps.assignedTo}</div>
    </div>
  );
}