import React, { useEffect, useState } from "react";
import { fetchEvents, Event, deleteEvent } from "../services/EventService";
import EventDialog from "../components/EventDialog";
import EventForm from "../components/EventForm"; 

const EventPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDialogOpen = (eventId?: number) => {
    setSelectedEventId(eventId || null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSave = (savedEvent: Event) => {
    setEvents((prevEvents) => {
      if (selectedEventId) {
        // Update existing event
        return prevEvents.map((event) => (event.id === savedEvent.id ? savedEvent : event));
      } else {
        // Add new event
        return [...prevEvents, savedEvent];
      }
    });
    handleDialogClose();
  };

  const handleDelete = async (eventId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      try {
        await deleteEvent(eventId);
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      } catch (err) {
        setError("Failed to delete event");
      }
    }
  };

  return (
    <div>
      <h1>Events</h1>
      <button onClick={() => handleDialogOpen()}>Add Event</button>
      <EventDialog open={dialogOpen} onClose={handleDialogClose} title={selectedEventId ? "Edit Event" : "Create New Event"}>
        <EventForm eventId={selectedEventId ?? undefined} onSave={handleSave} />
      </EventDialog>

      {/* Events List */}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>Discipline: {event.discipline.name}</h2>
            <p>Participants: {event.maximumParticipants}</p>
            <p>Gender: {event.participantGender}</p>
            <p>Age Group: {event.participantAgeGroup}</p>
            <p>Duration: {event.minimumDuration}</p>
            <p>
              Time Slot: {event.timeSlot.date} from {event.timeSlot.startTime} to {event.timeSlot.endTime}
            </p>
            <p>
              Track: {event.track.type} ({event.track.surface}, {event.track.lanes} lanes)
            </p>
            <button onClick={() => handleDialogOpen(event.id)}>Edit</button>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventPage;
