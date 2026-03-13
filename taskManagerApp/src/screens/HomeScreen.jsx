import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';

import ProjectCard from '../components/ProjectCard';
import { getAllProjects, deleteProject } from '../api/projectApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '@/style/home';

export default function HomeScreen({ navigation }) {
  const [projects, setProjects] = useState([]);

  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  //pagination
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
      fetchProjects(search);
    }, [search]),
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProjects(search);
    setRefreshing(false);
  };

  const handleDelete = id => {
    Alert.alert('Delete Project', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteProject(id);
            fetchProjects(search);
          } catch (error) {
            console.log('Delete error:', error);
          }
        },
      },
    ]);
  };

  const handleSearch = text => {
    setSearch(text);
    setPage(1);
    fetchProjects(text, 1);
  };

  if (initialLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <Text style={styles.welcomeUser}>Welcome, {user?.name}</Text>
      <View style={styles.topBar}>
        <TextInput
          placeholder="Search projects..."
          value={search}
          onChangeText={handleSearch}
          style={styles.search}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProject')}
        >
          <Text style={styles.addText}>＋</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={projects}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={() =>
              navigation.navigate('ProjectDetail', { id: item._id })
            }
            onEdit={() => navigation.navigate('EditProject', { project: item })}
            onDelete={handleDelete}
            onViewTasks={() =>
              navigation.navigate('ProjectTasks', { id: item._id })
            }
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}
