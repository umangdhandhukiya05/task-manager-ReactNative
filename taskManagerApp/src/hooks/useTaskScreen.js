import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getProjectTasks } from '@/api/taskApi';
import { DropDownOption } from '@/constants/formConstants';

export function useTasks(projectId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const statusData = [
    { label: 'All Status', value: '' },
    ...DropDownOption.statusDropDown,
  ];

  const priorityData = [
    { label: 'All Priority', value: '' },
    ...DropDownOption.priorityDropDown,
  ];

  const fetchTasks = async () => {
    try {
      const res = await getProjectTasks(projectId, {
        search,
        status,
        priority,
      });

      setTasks(res?.data?.tasks || []);
    } catch (error) {
      console.log('Fetch tasks error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [search, status, priority, projectId]),
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
  };

  return {
    tasks,
    loading,
    refreshing,
    search,
    setSearch,
    status,
    setStatus,
    priority,
    setPriority,
    statusData,
    priorityData,
    handleRefresh,
  };
}
