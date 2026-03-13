import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { updateTaskStatus } from '@/api/taskApi';
import { Icon } from '@rneui/themed';
import { styles } from '@/style/TaskCard';

function TaskCard({ task }) {
  const navigation = useNavigation();

  //from redux store
  const user = useSelector(state => state.auth.user);
  const currentUserId = user?._id;

  const [status, setStatus] = useState(task.status);

  //for priority chip color
  const priorityColor = {
    Low: '#9CA3AF',
    Medium: '#F59E0B',
    High: '#EF4444',
  };

  //for status chip color
  const statusColor = {
    todo: '#6B7280',
    inProgress: '#F59E0B',
    done: '#10B981',
  };

  //deopdown value for status change
  const statusOptions = [
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'inProgress' },
    { label: 'Done', value: 'done' },
  ];

  //verify current user is task creator or task assignedToUser
  const isCreator =
    String(task.createdBy?._id || task.createdBy) === String(currentUserId);

  const isAssignedUser =
    String(task.assignedToUser?._id || task.assignedToUser) ===
    String(currentUserId);

  //handle dropdown visibility
  const isCompleted = status === 'done';

  const handleStatusChange = async value => {
    try {
      setStatus(value); // update ui immediately
      await updateTaskStatus(task._id, value);
    } catch (error) {
      console.log('Status update error', error);
    }
  };

  //edit function
  const handleEdit = () => {
    navigation.navigate('EditTask', { task });
  };

  //date formatiing
  const formatDate = date => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {task.title}
        </Text>

        {/* show when current user is creator */}
        {isCreator && (
          <TouchableOpacity onPress={handleEdit}>
            <Icon name="edit" type="material" color="#FF7A00" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>

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

      {/* show when current user is assigned user and task is not completed */}
      {isAssignedUser && !isCompleted && (
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
      <Text style={styles.dueDate}>
        Assigned To: {task?.assignedToUser?.name}
      </Text>
    </View>
  );
}

const MemoTaskCard = React.memo(TaskCard);
export default MemoTaskCard;
