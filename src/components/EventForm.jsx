const EventForm = ({
  newEventTitle,
  newEventTime,
  onTitleChange,
  onTimeChange,
  onAddEvent,
  onCancel
}) => {
  return (
    <div className="bg-white rounded-lg p-3 mb-3 border">
      <input
        type="text"
        placeholder="Event title"
        value={newEventTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full p-2 border rounded-md mb-2 text-sm"
        autoFocus
      />
      <input
        type="time"
        value={newEventTime}
        onChange={(e) => onTimeChange(e.target.value)}
        className="w-full p-2 border rounded-md mb-3 text-sm"
      />
      <div className="flex gap-2">
        <button
          onClick={onAddEvent}
          className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-600 transition-colors"
        >
          Add Event
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-3 rounded-md text-sm hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventForm;