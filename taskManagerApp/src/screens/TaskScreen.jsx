import { getProjectTasks } from '@/api/taskApi';
import TaskCard from '@/components/TaskCard';
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

export default function TaskScreen({ route, navigation }) {
  const { id } = route.params;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const statusData = [
    { label: 'All Status', value: '' },
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'inProgress' },
    { label: 'Done', value: 'done' },
  ];

  const priorityData = [
    { label: 'All Priority', value: '' },
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ];

  const fetchTasks = async () => {
    try {
      const res = await getProjectTasks(id, { search, status, priority });
      setTasks(res?.data?.tasks || []);
    } catch (error) {
      console.log('Fetch tasks error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, status, priority]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.addText}>＋</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <Dropdown
          style={styles.dropdown}
          data={statusData}
          labelField="label"
          valueField="value"
          placeholder="Status"
          value={status}
          onChange={item => setStatus(item.value)}
        />

        <Dropdown
          style={styles.dropdown}
          data={priorityData}
          labelField="label"
          valueField="value"
          placeholder="Priority"
          value={priority}
          onChange={item => setPriority(item.value)}
        />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <TaskCard task={item} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks found</Text>
        }
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

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  search: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 8,
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  dropdown: {
    width: '48%',
    height: 42,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 10,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },

  addButton: {
    backgroundColor: '#FF7A00',
    height: 42,
    width: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
  },
});
