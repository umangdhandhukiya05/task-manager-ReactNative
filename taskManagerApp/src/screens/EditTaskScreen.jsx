import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { allUsers } from '@/api/userApi';
import { updateTask } from '@/api/taskApi';
import { styles } from '@/style/addTaskForm';

export default function EditTaskScreen({ route, navigation }) {
  const { task } = route.params;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(task.dueDate);
  const [users, setUsers] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  const statusData = [
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'inProgress' },
    { label: 'Done', value: 'done' },
  ];

  const priorityData = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ];

  const getUsers = async () => {
    try {
      const res = await allUsers();

      const formattedUsers = res?.data?.users?.map(user => ({
        label: user.name,
        value: user._id,
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.log('User fetch error:', error);
    }
  };

  useEffect(() => {
    getUsers();

    // Prefill form values
    setValue('title', task.title);
    setValue('description', task.description);
    setValue('assignedToUser', task.assignedToUser?._id);
    setValue('status', task.status);
    setValue('priority', task.priority);
  }, []);

  const onSubmit = async data => {
    try {
      const updatedTask = {
        ...data,
        dueDate: date,
      };

      await updateTask(task._id, updatedTask);

      Alert.alert('Success', 'Task Updated');

      navigation.goBack();
    } catch (error) {
      console.log('Update task error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Edit Task</Text>

          <Text style={styles.label}>Title</Text>

          <Controller
            control={control}
            name="title"
            rules={{ required: 'Title required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.title && styles.errorInput]}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Text style={styles.label}>Description</Text>

          <Controller
            control={control}
            name="description"
            rules={{ required: 'Description required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                multiline
                style={[styles.input, { height: 100 }]}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Text style={styles.label}>Assign To</Text>

          <Controller
            control={control}
            name="assignedToUser"
            rules={{ required: 'User required' }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={styles.dropdown}
                data={users}
                labelField="label"
                valueField="value"
                value={value}
                placeholder="Select user"
                onChange={item => onChange(item.value)}
              />
            )}
          />

          <Text style={styles.label}>Status</Text>

          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={styles.dropdown}
                data={statusData}
                labelField="label"
                valueField="value"
                value={value}
                placeholder="Select status"
                onChange={item => onChange(item.value)}
              />
            )}
          />

          <Text style={styles.label}>Priority</Text>

          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={styles.dropdown}
                data={priorityData}
                labelField="label"
                valueField="value"
                value={value}
                placeholder="Select priority"
                onChange={item => onChange(item.value)}
              />
            )}
          />

          <Text style={styles.label}>Due Date</Text>

          <TouchableOpacity
            style={styles.dateBtn}
            onPress={() => setCalendarVisible(true)}
          >
            <Text>{date || 'Select Date'}</Text>
          </TouchableOpacity>

          <Modal visible={calendarVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.calendarBox}>
                <Calendar
                  minDate={today}
                  onDayPress={day => {
                    setDate(day.dateString);
                    setCalendarVisible(false);
                  }}
                  markedDates={{
                    [date]: { selected: true, selectedColor: '#FF7A00' },
                  }}
                />

                <TouchableOpacity
                  onPress={() => setCalendarVisible(false)}
                  style={styles.closeBtn}
                >
                  <Text style={{ color: '#FFF' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Update Task</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
