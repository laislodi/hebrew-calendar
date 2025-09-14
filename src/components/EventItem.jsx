const EventItem = ({ event, onRemove }) => {
  return (
    <div className="bg-white rounded-lg p-3 flex items-center justify-between border">
      <div>
        <div className="font-medium text-gray-800 text-sm">{event.title}</div>
        <div className="text-gray-500 text-xs">{event.time}</div>
      </div>
      <button
        onClick={() => onRemove(event.id)}
        className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default EventItem;