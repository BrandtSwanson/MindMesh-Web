import axios from 'axios';

const baseURL = 'http://localhost:8080'; // Replace with your Go backend's URL

const api = axios.create({
  baseURL,
});

export const createNote = (note) => {
  return api.post('/api/notes', note);
};

export const getNotes = () => {
  return api.get('/api/notes');
};

export const getNoteById = (noteId) => {
  return api.get(`/api/notes/${noteId}`);
};

export const updateNote = (noteId, note) => {
  return api.put(`/api/notes/${noteId}`, note);
};

export const deleteNote = (noteId) => {
  return api.delete(`/api/notes/${noteId}`);
};


export const createGoal = (goal) => {
  return api.post('/api/goals', goal);
};

export const getGoals = () => {
  return api.get('/api/goals');
};

export const getGoalById = (goalId) => {
  return api.get(`/api/goals/${goalId}`);
};

export const updateGoal = (goalId, goal) => {
  return api.put(`/api/goals/${goalId}`, goal);
};

export const deleteGoal = (goalId) => {
  return api.delete(`/api/goals/${goalId}`);
};