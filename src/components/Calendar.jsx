import { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventsPanel from './EventsPanel';

const HebrewCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const selectDate = (day) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelectedDate);
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
