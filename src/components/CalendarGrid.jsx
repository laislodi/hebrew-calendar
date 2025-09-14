import { HDate } from '@hebcal/core';
import CalendarDay from './CalendarDay';

const CalendarGrid = ({
  currentDate,
  selectedDate,
  events,
  onSelectDate
}) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInHebrewMonth = (hdate) => {
    return hdate.daysInMonth();
  };

  const getFirstDayOfHebrewMonth = (hdate) => {
    const firstDay = new HDate(1, hdate.getMonth(), hdate.getFullYear());
    return firstDay.greg().getDay(); // 0 = Sunday, 6 = Saturday
  };

  const formatDateKey = (hdate) => {
    return `${hdate.getFullYear()}-${hdate.getMonth()}-${hdate.getDate()}`;
  };

  const isToday = (day) => {
    const today = new HDate();
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const isSelected = (day) => {
    return day === selectedDate.getDate() &&
           currentDate.getMonth() === selectedDate.getMonth() &&
           currentDate.getFullYear() === selectedDate.getFullYear();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInHebrewMonth(currentDate);
    const firstDay = getFirstDayOfHebrewMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <CalendarDay key={`empty-${i}`} isEmpty={true} />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayHDate = new HDate(day, currentDate.getMonth(), currentDate.getFullYear());
      const dateKey = formatDateKey(dayHDate);
      const hasEvents = events[dateKey]?.length > 0;

      days.push(
        <CalendarDay
          key={day}
          day={day}
          isToday={isToday(day)}
          isSelected={isSelected(day)}
          hasEvents={hasEvents}
          onClick={onSelectDate}
        />
      );
    }

    return days;
  };

  return (
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
    </div>
  );
};

export default CalendarGrid;