import React, { useState, useEffect } from "react";
import { createEvent, updateEvent, fetchEventById } from "../services/EventService"; // Adjust the import path accordingly
import { EventCreatePayload, Event } from "../services/EventService"; // Adjust the import path accordingly
import axios from "axios";

interface EventFormProps {
  eventId?: number; // Optional if you're creating a new event
  onSave: (event: Event) => void; // Callback to notify parent component
}

const EventForm: React.FC<EventFormProps> = ({ eventId, onSave }) => {
  const [formData, setFormData] = useState<EventCreatePayload>({
    minimumDuration: "",
    maximumParticipants: 0,
    participantGender: "",
    participantAgeGroup: "",
    timeSlot: { id: 0 },
    track: { id: 0 },
    discipline: { id: 0 },
  });

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId)
        .then((event) => {
          setFormData({
            minimumDuration: event.minimumDuration,
            maximumParticipants: event.maximumParticipants,
            participantGender: event.participantGender,
            participantAgeGroup: event.participantAgeGroup,
            timeSlot: { id: event.timeSlot.id },
            track: { id: event.track.id },
            discipline: { id: event.discipline.id },
          });
        })
        .catch((error) => console.error("Error fetching event:", error));
    }
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let savedEvent;
      const payload: EventCreatePayload = {
        minimumDuration: formData.minimumDuration,
        maximumParticipants: formData.maximumParticipants,
        participantGender: formData.participantGender,
        participantAgeGroup: formData.participantAgeGroup,
        timeSlot: { id: formData.timeSlot.id },
        track: { id: formData.track.id },
        discipline: { id: formData.discipline.id },
      };

      if (eventId) {
        savedEvent = await updateEvent(eventId, payload);
      } else {
        savedEvent = await createEvent(payload);
      }

      onSave(savedEvent);
    } catch (error) {
      if (axios.isAxiosError(error)) {
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Minimum Duration:</label>
        <input type="text" name="minimumDuration" value={formData.minimumDuration} onChange={handleChange} placeholder="e.g., PT30M" required />
      </div>
      <div>
        <label>Maximum Participants:</label>
        <input type="number" name="maximumParticipants" value={formData.maximumParticipants} onChange={handleChange} required />
      </div>
      <div>
        <label>Participant Gender:</label>
        <input type="text" name="participantGender" value={formData.participantGender} onChange={handleChange} required />
      </div>
      <div>
        <label>Participant Age Group:</label>
        <input type="text" name="participantAgeGroup" value={formData.participantAgeGroup} onChange={handleChange} required />
      </div>
      <div>
        <label>Time Slot ID:</label>
        <input type="number" name="timeSlot" value={formData.timeSlot.id} onChange={(e) => setFormData({ ...formData, timeSlot: { id: Number(e.target.value) } })} required />
      </div>
      <div>
        <label>Track ID:</label>
        <input type="number" name="track" value={formData.track.id} onChange={(e) => setFormData({ ...formData, track: { id: Number(e.target.value) } })} required />
      </div>
      <div>
        <label>Discipline ID:</label>
        <input type="number" name="discipline" value={formData.discipline.id} onChange={(e) => setFormData({ ...formData, discipline: { id: Number(e.target.value) } })} required />
      </div>
      <button type="submit">{eventId ? "Update Event" : "Create Event"}</button>
    </form>
  );
};

export default EventForm;
