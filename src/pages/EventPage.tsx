import React, { useEffect, useState } from "react";
import { createEvent, fetchEvents, Event } from "../services/EventService";
import EventDialog from "../components/EventDialog";

const EventPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [minimumDuration, setMinimumDuration] = useState<string>("");
  const [maximumParticipants, setMaximumParticipants] = useState<number>(0);
  const [participantGender, setParticipantGender] = useState<string>("");
  const [participantAgeGroup, setParticipantAgeGroup] = useState<string>("");

  const [timeSlotId, setTimeSlotId] = useState<number>(0);
  const [trackId, setTrackId] = useState<number>(0);
  const [disciplineId, setDisciplineId] = useState<number>(0);

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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    // Reset form fields
    setMinimumDuration("");
    setMaximumParticipants(0);
    setParticipantGender("");
    setParticipantAgeGroup("");
    setTimeSlotId(0);
    setTrackId(0);
    setDisciplineId(0);
  };

  const handleFormSubmit = async () => {
    try {
      // Construct the payload with only IDs for timeSlot, track, and discipline
      const payload = {
        minimumDuration, // e.g., "PT30M"
        maximumParticipants,
        participantGender,
        participantAgeGroup,
        timeSlot: { id: timeSlotId }, // Using only the ID
        track: { id: trackId }, // Using only the ID
        discipline: { id: disciplineId }, // Using only the ID
      };

      // Send the payload to the createEvent function
      const newEvent = await createEvent(payload);

      // Update the events list with the newly created event
      setEvents((prevEvents) => [...prevEvents, newEvent]);

      // Close the dialog after creating the event
      handleDialogClose();
    } catch (err) {
      setError("Failed to create event");
    }
  };

  return (
    <div>
      <h1>Events</h1>
      <button onClick={handleDialogOpen}>Add Event</button>
      <EventDialog open={dialogOpen} onClose={handleDialogClose} title="Create New Event">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          {/* Event Fields */}
          <label>
            Maximum Participants:
            <input type="number" value={maximumParticipants} onChange={(e) => setMaximumParticipants(Number(e.target.value))} required />
          </label>
          <br />
          <label>
            Minimum Duration:
            <input type="text" value={minimumDuration} onChange={(e) => setMinimumDuration(e.target.value)} placeholder="e.g., PT30M" required />
          </label>
          <br />
          <label>
            Gender:
            <input type="text" value={participantGender} onChange={(e) => setParticipantGender(e.target.value)} required />
          </label>
          <br />
          <label>
            Age Group:
            <input type="text" value={participantAgeGroup} onChange={(e) => setParticipantAgeGroup(e.target.value)} required />
          </label>
          <br />

          {/* Associated Entity IDs */}
          <label>
            Time Slot ID:
            <input type="number" value={timeSlotId} onChange={(e) => setTimeSlotId(Number(e.target.value))} required />
          </label>
          <br />
          <label>
            Track ID:
            <input type="number" value={trackId} onChange={(e) => setTrackId(Number(e.target.value))} required />
          </label>
          <br />
          <label>
            Discipline ID:
            <input type="number" value={disciplineId} onChange={(e) => setDisciplineId(Number(e.target.value))} required />
          </label>
          <br />

          {/* Form Actions */}
          <div className="dialog-footer">
            <button type="button" onClick={handleDialogClose}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventPage;
