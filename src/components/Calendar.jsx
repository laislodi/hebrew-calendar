import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react';

const HebrewCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    return day === selectedDate.getDate() && 
           currentDate.getMonth() === selectedDate.getMonth() && 
           currentDate.getFullYear() === selectedDate.getFullYear();
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

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-12 flex items-center justify-center"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
      const hasEvents = events[dateKey]?.length > 0;
      
      days.push(
        <div
          key={day}
          onClick={() => selectDate(day)}
          className={`
            h-12 flex items-center justify-center text-sm font-medium cursor-pointer rounded-lg relative
            ${isToday(day) ? 'bg-blue-500 text-white' : ''}
            ${isSelected(day) && !isToday(day) ? 'bg-blue-100 text-blue-600' : ''}
            ${!isToday(day) && !isSelected(day) ? 'hover:bg-gray-100' : ''}
            transition-colors duration-200
          `}
        >
          {day}
          {hasEvents && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
          )}
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = events[formatDateKey(selectedDate)] || [];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h1 className="text-lg font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
          
          <button 
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="text-sm">
            Selected: {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4 flex-1">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {renderCalendarDays()}
        </div>

        {/* Events section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-800">
              Events for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </h3>
            <button
              onClick={() => setShowEventForm(true)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Event form */}
          {showEventForm && (
            <div className="bg-white rounded-lg p-3 mb-3 border">
              <input
                type="text"
                placeholder="Event title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full p-2 border rounded-md mb-2 text-sm"
                autoFocus
              />
              <input
                type="time"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="w-full p-2 border rounded-md mb-3 text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={addEvent}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-600 transition-colors"
                >
                  Add Event
                </button>
                <button
                  onClick={() => {
                    setShowEventForm(false);
                    setNewEventTitle('');
                    setNewEventTime('');
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Events list */}
          <div className="space-y-2">
            {selectedDateEvents.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No events scheduled</p>
            ) : (
              selectedDateEvents.map(event => (
                <div key={event.id} className="bg-white rounded-lg p-3 flex items-center justify-between border">
                  <div>
                    <div className="font-medium text-gray-800 text-sm">{event.title}</div>
                    <div className="text-gray-500 text-xs">{event.time}</div>
                  </div>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HebrewCalendar;
