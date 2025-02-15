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

export const getHealthEntries = () => {
  return api.get(`/api/healthdata`);
};

export const saveEvent = (event:string, eventId:number) => {
  return api.post(`/api/events/${eventId}`, event);
};

export const getEventById = (eventId: number) => {
  return api.get(`/api/events/${eventId}`)
    .then(response => response.data) // Extract the event data from the response
    .catch(error => {
      console.error("Error fetching event:", error);
      return null; // In case of error, return null or handle it accordingly
    });
};

export const getEvents = () => {
  return api.get(`/api/events`);
};

export const deleteEvent = (eventId:number) => {
  return api.delete(`/api/events/${eventId}`);
};

export const updateEvent = (event:string, eventId:number) => {
  return api.put(`/api/events/${eventId}`, event);
};

export const getAllAgents = () => {
  return api.get('/api/agents');
};

export const getAgentById = (agentId:number) => {
  return api.get(`/api/agents/${agentId}`)
    .then(response => response.data) // Extract the event data from the response
    .catch(error => {
      console.error("Error fetching event:", error);
      return null; // In case of error, return null or handle it accordingly
    });
};

export const updateAgent = (agent:string, agentId:number) => {
  return api.put(`/api/agents/${agentId}`, agent);
};

export const deleteAgent = (agentId:number) => {
  return api.delete(`/api/agents/${agentId}`);
};

export const createAgent = (agent:string, agentId:number) => {
  return api.post(`/api/agents/${agentId}`, agent);
};

export const getCollections = () => {
  return api.get(`/api/collections`);
};