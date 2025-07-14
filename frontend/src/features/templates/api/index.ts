import axios from 'axios';

export const getTemplates = (token: string) =>
  axios.get('/api/templates/', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createTemplate = (token: string, data: any) =>
  axios.post('/api/templates/', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTemplate = (token: string, id: number, data: any) =>
  axios.put(`/api/templates/${id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTemplate = (token: string, id: number) =>
  axios.delete(`/api/templates/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });