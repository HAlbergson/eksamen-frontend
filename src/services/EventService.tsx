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

// Create a new event
export const createEvent = async (event: EventCreatePayload): Promise<Event> => {
  const response = await axios.post<Event>(API_URL, event);
  console.log(response.data);
  return response.data;
};

// Update an existing event
export const updateEvent = async (id: number, event: EventCreatePayload): Promise<Event> => {
  const response = await axios.put<Event>(`${API_URL}/${id}`, event);
  console.log(response.data);
  return response.data;
};

// Delete an event by ID
export const deleteEvent = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
  console.log(`Event with id ${id} deleted`);
};
