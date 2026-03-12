import api from './apiLayer';

//api function for project crud

//add project
export const addProject = data => {
  return api.post('/api/projects/create', data);
};

//get all project
export const getAllProjects = (page = 1, search = '') => {
  return api.get(`/api/projects/allprojects?page=${page}&search=${search}`);
};

//delete project
export const deleteProject = id => {
  return api.delete(`/api/projects/${id}`);
};

//update project
export const updateProject = (id, data) => {
  return api.put(`api/projects/${id}`, data);
};

//get single project
export const getSingleProject = (id) => {
  return api.get(`api/projects/${id}`);
};
