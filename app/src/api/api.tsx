import axios from 'axios';

const baseURL = 'http://localhost:8181'; // Replace with your Go backend's URL

const api = axios.create({
  baseURL,
});

export const createNote = (note:string) => {
  return api.post('/api/notes', note);
};

export const getNotes = () => {
  return api.get('/api/notes');
};

export const getNoteById = (noteId:number) => {
  return api.get(`/api/notes/${noteId}`);
};

export const updateNote = (noteId:number, note:string) => {
  return api.put(`/api/notes/${noteId}`, note);
};

export const deleteNote = (noteId:number) => {
  return api.delete(`/api/notes/${noteId}`);
};

export const addPersonalData = (personal:string) => {
  return api.post(`/api/personal`, personal);
};

export const getPersonalEntries = () => {
  return api.get(`/api/personal`);
};

export const saveEvent = (event:string, eventId:number) => {
  return api.post(`/api/events/${eventId}`, event);
};

export const getEventById = (eventId:number) => {
  return api.get(`/api/events/${eventId}`);
};