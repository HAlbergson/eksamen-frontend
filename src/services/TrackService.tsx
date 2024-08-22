// src/services/trackService.ts
import axios from "axios";

export interface Track {
  id: number;
  type: string;
  shape: string;
  surface: string;
  length: string;
  lanes: string;
}

const API_URL = "http://localhost:8080/tracks";

// Fetch all tracks
export const fetchTracks = async (): Promise<Track[]> => {
  const response = await axios.get<Track[]>(API_URL);
  console.log(response.data);
  return response.data;
};

// Fetch a single track by ID
export const fetchTrackById = async (id: number): Promise<Track> => {
  const response = await axios.get<Track>(`${API_URL}/${id}`);
  console.log(response.data);
  return response.data;
};

// Create a new track
export const createTrack = async (track: Track): Promise<Track> => {
  const response = await axios.post<Track>(API_URL, track);
  console.log(response.data);
  return response.data;
};

// Update an existing track
export const updateTrack = async (id: number, track: Track): Promise<Track> => {
  const response = await axios.put<Track>(`${API_URL}/${id}`, track);
  console.log(response.data);
  return response.data;
};

// Delete a track by ID
export const deleteTrack = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
  console.log(`Track with id ${id} deleted`);
};
