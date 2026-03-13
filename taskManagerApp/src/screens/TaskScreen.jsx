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
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/style/taskScreen';

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
      // console.log(res);
      setTasks(res?.data?.tasks);
      // console.log('----------tasks', tasks);
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
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search tasks..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask', { projectId: id })}
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
    </SafeAreaView>
  );
}
