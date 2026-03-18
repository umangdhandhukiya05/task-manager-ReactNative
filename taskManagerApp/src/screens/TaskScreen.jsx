import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskCard from '@/components/TaskCard';
import { styles } from '@/style/taskScreen';
import { useTasks } from '@/hooks/useTaskScreen';


export default function TaskScreen({ route, navigation }) {
  const { id } = route.params;

  const {
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
  } = useTasks(id);

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
          onPress={() =>
            navigation.navigate('AddTask', { projectId: id })
          }
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