import React, { useEffect, useState } from "react";
import { fetchEvents, Event } from "../services/EventService";

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Function to convert date and time to JavaScript Date object
  const toDateTime = (date: string, time: string) => new Date(`${date}T${time}`);

  // Sort events by timeSlot.date and timeSlot.startTime
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = toDateTime(a.timeSlot.date, a.timeSlot.startTime);
    const dateB = toDateTime(b.timeSlot.date, b.timeSlot.startTime);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div>
      <h1>Events Calendar</h1>
      <ul>
        {sortedEvents.map((event) => (
          <li key={event.id}>
            <h2>Discipline: {event.discipline.name}</h2>
            <p>Participants: {event.maximumParticipants}</p>
            <p>Gender: {event.participantGender}</p>
            <p>Age Group: {event.participantAgeGroup}</p>
            <p>Duration: {event.minimumDuration}</p>
            <p>
              Date: {event.timeSlot.date} from {event.timeSlot.startTime} to {event.timeSlot.endTime}
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

export default CalendarPage;
