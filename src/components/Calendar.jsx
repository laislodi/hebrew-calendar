import { useState } from 'react';
import { HDate } from '@hebcal/core';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventsPanel from './EventsPanel';

const HebrewCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new HDate());
  const [selectedDate, setSelectedDate] = useState(new HDate());
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const formatDateKey = (hdate) => {
    return `${hdate.getFullYear()}-${hdate.getMonth()}-${hdate.getDate()}`;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newHDate = new HDate(prev);
      // Navigate by approximately 30 days to get to next/previous month
      return newHDate.add(direction > 0 ? 30 : -30);
    });
  };

  const selectDate = (day) => {
    const newHDate = new HDate(day, currentDate.getMonth(), currentDate.getFullYear());
    setSelectedDate(newHDate);
  };

  const addEvent = () => {
    if (newEventTitle.trim()) {
      const dateKey = formatDateKey(selectedDate);
      const newEvent = {
        id: Date.now(),
        title: newEventTitle.trim(),
        time: newEventTime || '12:00'
      };

      setEvents(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent]
      }));

      setNewEventTitle('');
      setNewEventTime('');
      setShowEventForm(false);
    }
  };

  const removeEvent = (eventId) => {
    const dateKey = formatDateKey(selectedDate);
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey]?.filter(event => event.id !== eventId) || []
    }));
  };

  const handleCancelForm = () => {
    setShowEventForm(false);
    setNewEventTitle('');
    setNewEventTime('');
  };

  const selectedDateEvents = events[formatDateKey(selectedDate)] || [];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      <CalendarHeader
        currentDate={currentDate}
        selectedDate={selectedDate}
        onNavigateMonth={navigateMonth}
      />

      <CalendarGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        events={events}
        onSelectDate={selectDate}
      />

      <EventsPanel
        selectedDate={selectedDate}
        events={selectedDateEvents}
        showEventForm={showEventForm}
        newEventTitle={newEventTitle}
        newEventTime={newEventTime}
        onShowForm={() => setShowEventForm(true)}
        onTitleChange={setNewEventTitle}
        onTimeChange={setNewEventTime}
        onAddEvent={addEvent}
        onCancelForm={handleCancelForm}
        onRemoveEvent={removeEvent}
      />
    </div>
  );
};

export default HebrewCalendar;
