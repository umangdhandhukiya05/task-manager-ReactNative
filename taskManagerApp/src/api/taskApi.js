import api from './apiLayer';

export const addTask = (projectId, taskDetail) => {
  return api.post(`/api/tasks/create?projectId=${projectId}`, taskDetail);
};

export const getProjectTasks = (projectId, filters = {}) => {
  const query = new URLSearchParams({
    projectId,
    ...filters,
  }).toString();

  return api.get(`/api/tasks/alltask?${query}`);
};

export const updateTask = (taskId, taskDetail) => {
  return api.put(`/api/tasks/update?id=${taskId}`, taskDetail);
};

export const updateTaskStatus = (taskId, status) => {
  return api.patch(`/api/tasks/${taskId}/status`, { status });
};
