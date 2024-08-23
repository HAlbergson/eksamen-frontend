import axios from "axios";

export interface Event {
  id: number;
  minimumDuration: string; // or Duration if you convert it
  maximumParticipants: number;
  participantGender: string;
  participantAgeGroup: string;
  timeSlot: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  };
  track: {
    id: number;
    type: string;
    shape: string;
    surface: string;
    length: string;
    lanes: string;
  };
  discipline: {
    id: number;
    name: string;
    approxDuration: string;
  };
}

const API_URL = "http://localhost:8080/events";

// Fetch all events
export const fetchEvents = async (): Promise<Event[]> => {
  const response = await axios.get<Event[]>(API_URL);
  console.log(response.data);
  return response.data;
};

// Fetch a single event by ID
export const fetchEventById = async (id: number): Promise<Event> => {
  const response = await axios.get<Event>(`${API_URL}/${id}`);
  console.log(response.data);
  return response.data;
};

// Use a type that includes only the IDs for timeSlot, track, and discipline
export type EventCreatePayload = {
  minimumDuration: string;
  maximumParticipants: number;
  participantGender: string;
  participantAgeGroup: string;
  timeSlot: { id: number };
  track: { id: number };
  discipline: { id: number };
};


export const createEvent = async (eventData: EventCreatePayload) => {
  try {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (eventId: number, eventData: EventCreatePayload) => {
  try {
    const response = await axios.put(`${API_URL}/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete an event by ID
export const deleteEvent = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
  console.log(`Event with id ${id} deleted`);
};
