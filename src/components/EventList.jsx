import EventItem from './EventItem';

const EventList = ({ events, onRemoveEvent }) => {
  if (events.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-4">No events scheduled</p>
    );
  }

  return (
    <div className="space-y-2">
      {events.map(event => (
        <EventItem
          key={event.id}
          event={event}
          onRemove={onRemoveEvent}
        />
      ))}
    </div>
  );
};

export default EventList;