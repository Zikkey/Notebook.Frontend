import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bbanr7pkbo7oql8f31si.containers.yandexcloud.net/api/v1/Note',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getNotes = () => api.get('/get_all');
export const getNote = (id) => api.get(`/get?id=${id}`);
export const createNote = (note) => api.post('/create', note);
export const updateNote = (note) => api.post('/update', note);
export const deleteNote = (id) => api.delete(`/delete?id=${id}`);