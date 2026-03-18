import { useEffect, useState } from 'react';
import { getSingleProject } from '@/api/projectApi';

export function useProjectDetail(projectId) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      const res = await getSingleProject(projectId);
      setProject(res?.data?.project);
    } catch (error) {
      console.log('Project fetch error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return {
    project,
    loading,
    formatDate,
  };
}