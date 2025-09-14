import { Plus } from 'lucide-react';
import EventForm from './EventForm';
import EventList from './EventList';

const EventsPanel = ({
  selectedDate,
  events,
  showEventForm,
  newEventTitle,
  newEventTime,
  onShowForm,
  onTitleChange,
  onTimeChange,
  onAddEvent,
  onCancelForm,
  onRemoveEvent
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-800">
          Events for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </h3>
        <button
          onClick={onShowForm}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {showEventForm && (
        <EventForm
          newEventTitle={newEventTitle}
          newEventTime={newEventTime}
          onTitleChange={onTitleChange}
          onTimeChange={onTimeChange}
          onAddEvent={onAddEvent}
          onCancel={onCancelForm}
        />
      )}

      <EventList
        events={events}
        onRemoveEvent={onRemoveEvent}
      />
    </div>
  );
};

export default EventsPanel;