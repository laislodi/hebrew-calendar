import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const CalendarHeader = ({ currentDate, selectedDate, onNavigateMonth }) => {
  const getHebrewMonthName = (hdate) => {
    return hdate.getMonthName();
  };

  const formatSelectedDate = (hdate) => {
    const gregorianDate = hdate.greg();
    const weekday = gregorianDate.toLocaleDateString('en-US', { weekday: 'long' });
    const hebrewMonth = getHebrewMonthName(hdate);
    const day = hdate.getDate();
    const year = hdate.getFullYear();
    return `${weekday}, ${hebrewMonth} ${day}, ${year}`;
  };

  return (
    <div className="bg-blue-500 text-white p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigateMonth(-1)}
          className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <h1 className="text-lg font-semibold">
          {getHebrewMonthName(currentDate)} {currentDate.getFullYear()}
        </h1>

        <button
          onClick={() => onNavigateMonth(1)}
          className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <span className="text-sm">
          Selected: {formatSelectedDate(selectedDate)}
        </span>
      </div>
    </div>
  );
};

export default CalendarHeader;