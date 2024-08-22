// src/services/disciplineService.ts
import axios from "axios";

export interface Discipline {
  id: number;
  name: string;
  approxDuration: string; // or Duration if you convert it
}

const API_URL = "http://localhost:8080/disciplines";

// Fetch all disciplines
export const fetchDisciplines = async (): Promise<Discipline[]> => {
  const response = await axios.get<Discipline[]>(API_URL);
  console.log(response.data);
  return response.data;
};

// Fetch a single discipline by ID
export const fetchDisciplineById = async (id: number): Promise<Discipline> => {
  const response = await axios.get<Discipline>(`${API_URL}/${id}`);
  console.log(response.data);
  return response.data;
};

// Create a new discipline
export const createDiscipline = async (discipline: Discipline): Promise<Discipline> => {
  const response = await axios.post<Discipline>(API_URL, discipline);
  console.log(response.data);
  return response.data;
};

// Update an existing discipline
export const updateDiscipline = async (id: number, discipline: Discipline): Promise<Discipline> => {
  const response = await axios.put<Discipline>(`${API_URL}/${id}`, discipline);
  console.log(response.data);
  return response.data;
};

// Delete a discipline by ID
export const deleteDiscipline = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
  console.log(`Discipline with id ${id} deleted`);
};
