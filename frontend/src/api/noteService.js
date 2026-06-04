import api from './api';

const addNote = async (userData) => {
  const response = await api.post('/notes/Addnote', userData);
  return response.data;
};

const getAllNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

const getNote = async (id) => {
  const response = await api.get(`/notes/getnote/${id}`);
  return response.data;
};

const updateNote = async (id, userData) => {
  const response = await api.put(`/notes/update/${id}`, userData);
  return response.data;
};

const deleteNote = async (id) => {
  const response = await api.delete(`/notes/delete/${id}`);
  return response.data;
};

const noteService = { addNote,getAllNotes,getNote,updateNote, deleteNote };

export default noteService;