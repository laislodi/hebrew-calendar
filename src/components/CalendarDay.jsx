const CalendarDay = ({
  day,
  isToday,
  isSelected,
  hasEvents,
  onClick,
  isEmpty = false
}) => {
  if (isEmpty) {
    return <div className="h-12 flex items-center justify-center"></div>;
  }

  return (
    <div
      onClick={() => onClick(day)}
      className={`
        h-12 flex items-center justify-center text-sm font-medium cursor-pointer rounded-lg relative
        ${isToday ? 'bg-blue-500 text-white' : ''}
        ${isSelected && !isToday ? 'bg-blue-100 text-blue-600' : ''}
        ${!isToday && !isSelected ? 'hover:bg-gray-100' : ''}
        transition-colors duration-200
      `}
    >
      {day}
      {hasEvents && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
      )}
    </div>
  );
};

export default CalendarDay;