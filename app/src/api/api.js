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