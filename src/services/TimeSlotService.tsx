// src/services/timeSlotService.ts
import axios from "axios";

export interface TimeSlot {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

const API_URL = "http://localhost:8080/timeslots";

// Fetch all time slots
export const fetchTimeSlots = async (): Promise<TimeSlot[]> => {
  const response = await axios.get<TimeSlot[]>(API_URL);
  console.log(response.data);
  return response.data;
};

// Fetch a single time slot by ID
export const fetchTimeSlotById = async (id: number): Promise<TimeSlot> => {
  const response = await axios.get<TimeSlot>(`${API_URL}/${id}`);
  console.log(response.data);
  return response.data;
};

// Create a new time slot
export const createTimeSlot = async (timeSlot: TimeSlot): Promise<TimeSlot> => {
  const response = await axios.post<TimeSlot>(API_URL, timeSlot);
  console.log(response.data);
  return response.data;
};

// Update an existing time slot
export const updateTimeSlot = async (id: number, timeSlot: TimeSlot): Promise<TimeSlot> => {
  const response = await axios.put<TimeSlot>(`${API_URL}/${id}`, timeSlot);
  console.log(response.data);
  return response.data;
};

// Delete a time slot by ID
export const deleteTimeSlot = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
  console.log(`TimeSlot with id ${id} deleted`);
};
