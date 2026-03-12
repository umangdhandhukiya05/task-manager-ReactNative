import api from './apiLayer';

export const addProject = (data) => {
  return api.post('/api/projects/create', data);
};

export const getAllProjects = (page = 1, search = '') => {
  return api.get(`/api/projects/allprojects?page=${page}&search=${search}`);
};

export const deleteProject = (id) => {
  return api.delete(`/api/projects/${id}`);
};

export const updateProject = (id, data) => {
  return api.put(`api/projects/${id}`, data);
};
