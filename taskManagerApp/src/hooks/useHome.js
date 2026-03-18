import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';

import { getAllProjects, deleteProject } from '@/api/projectApi';

export function useHome() {
  const [projects, setProjects] = useState([]);

  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState('');

  const user = useSelector(state => state.auth.user);

  const fetchProjects = async (searchText = '', pageNumber = 1) => {
    try {
      const response = await getAllProjects(pageNumber, searchText);

      const newProjects = response?.data?.projects || [];

      if (pageNumber === 1) {
        setProjects(newProjects);
      } else {
        setProjects(prev => [...prev, ...newProjects]);
      }

      if (newProjects.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadingMore(true);
      fetchProjects(search, nextPage);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProjects(search, 1);
    }, [search]),
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    await fetchProjects(search, 1);
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Project', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteProject(id);
            fetchProjects(search, 1);
          } catch (error) {
            console.log('Delete error:', error);
          }
        },
      },
    ]);
  };

  const handleSearch = (text) => {
    setSearch(text);
    setPage(1);
    setHasMore(true);
    fetchProjects(text, 1);
  };

  return {
    projects,
    initialLoading,
    refreshing,
    search,
    handleSearch,
    loadMore,
    handleRefresh,
    handleDelete,
    user,
  };
}