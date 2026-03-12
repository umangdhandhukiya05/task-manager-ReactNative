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

  const [search, setSearch] = useState('');

  const user = useSelector(state => state.auth.user);
  console.log(user);

  const fetchProjects = async (searchText = '') => {
    try {
      const response = await getAllProjects(1, searchText);
      const newProjects = response?.data?.projects || [];

      setProjects(newProjects);
    } catch (error) {
      console.log('Fetch projects error:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProjects();
    }),
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
    fetchProjects(text);
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
      <Text>Welcome, {user?.name}</Text>
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
        ListHeaderComponent={
          <Text style={styles.headerText}>All Projects</Text>
        }
        data={projects}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
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
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}
