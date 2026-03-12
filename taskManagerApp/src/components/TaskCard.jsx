import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { updateTaskStatus } from '@/api/taskApi';

function TaskCard({ task }) {
  const navigation = useNavigation();

  const user = useSelector(state => state.auth.user);
  const currentUserId = user?._id;
  console.log(user)

  const [status, setStatus] = useState(task.status);

  const priorityColor = {
    Low: '#9CA3AF',
    Medium: '#F59E0B',
    High: '#EF4444',
  };

  const statusColor = {
    todo: '#6B7280',
    inProgress: '#F59E0B',
    done: '#10B981',
  };

  const statusOptions = [
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'inProgress' },
    { label: 'Done', value: 'done' },
  ];

  const isCreator = task.createdBy?._id === currentUserId;
  const isAssignedUser = task.assignedToUser?._id === currentUserId;

  const handleStatusChange = async value => {
    try {
      setStatus(value);
      await updateTaskStatus(task._id, value);
    } catch (error) {
      console.log('Status update error', error);
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditTask', { task });
  };

  const formatDate = date => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>

        {isCreator && (
          <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.row}>
        <View
          style={[
            styles.chip,
            { backgroundColor: priorityColor[task.priority] || '#DDD' },
          ]}
        >
          <Text style={styles.chipText}>{task.priority}</Text>
        </View>

        <View
          style={[
            styles.chip,
            { backgroundColor: statusColor[status] || '#DDD' },
          ]}
        >
          <Text style={styles.chipText}>{status}</Text>
        </View>
      </View>

      {isAssignedUser && (
        <Dropdown
          style={styles.dropdown}
          data={statusOptions}
          labelField="label"
          valueField="value"
          value={status}
          placeholder="Change Status"
          onChange={item => handleStatusChange(item.value)}
        />
      )}

      <Text style={styles.dueDate}>Due: {formatDate(task.dueDate)}</Text>
    </View>
  );
}

const MemoTaskCard = React.memo(TaskCard);
export default MemoTaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },

  editBtn: {
    backgroundColor: '#FF7A00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  editText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  description: {
    marginTop: 6,
    color: '#555',
    fontSize: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  chip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 8,
  },

  chipText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },

  dropdown: {
    marginTop: 10,
    width: 160,
    height: 36,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  dueDate: {
    marginTop: 10,
    fontSize: 12,
    color: '#888',
  },
});
