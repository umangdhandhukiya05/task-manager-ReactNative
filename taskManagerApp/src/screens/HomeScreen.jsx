import React, { useEffect, useState } from 'react';
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

export default function HomeScreen({ navigation }) {
  const [projects, setProjects] = useState([]);

  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');

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

  useEffect(() => {
    fetchProjects();
  }, []);

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
    <View style={styles.container}>
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
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  search: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  addButton: {
    marginLeft: 10,
    backgroundColor: '#FF7A00',
    height: 48,
    width: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
