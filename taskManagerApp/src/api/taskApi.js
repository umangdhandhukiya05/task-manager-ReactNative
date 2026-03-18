import api from './apiLayer';

//api function for task

//add task
export const addTask = (projectId, taskDetail) => {
  return api.post(`/api/tasks/create?projectId=${projectId}`, taskDetail);
};

//get all task for that project
export const getProjectTasks = (projectId, filters = {}) => {
  const query = new URLSearchParams({
    projectId,
    ...filters,
  }).toString();

  return api.get(`/api/tasks/alltask?${query}`, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
};

//update task by creator
export const updateTask = (taskId, taskDetail) => {
  return api.put(`/api/tasks/${taskId}`, taskDetail);
};

//update task by assigned user
export const updateTaskStatus = (taskId, status) => {
  return api.patch(`/api/tasks/${taskId}/status`, { status });
};
