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
import { addTask } from '@/api/taskApi';
import { styles } from '@/style/addTaskForm';
import Toast from 'react-native-toast-message';

export default function AddTaskScreen({ navigation, route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(null);

  const [users, setUsers] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  const { projectId } = route.params;

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
      //   console.log(res?.data?.users);

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
  }, []);

  const onSubmit = async data => {
    try {
      const taskDetail = {
        ...data,
        dueDate: date,
      };
      const result = await addTask(projectId, taskDetail);
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: result?.data?.message,
      });
    } catch (error) {
      console.log('Create task error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Add New Task</Text>

          <Text style={styles.label}>Title</Text>

          <Controller
            control={control}
            name="title"
            rules={{
              required: 'Title is required',
              minLength: { value: 3, message: 'Minimum 3 characters' },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter task title"
                style={[styles.input, errors.title && styles.errorInput]}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}

          <Text style={styles.label}>Description</Text>

          <Controller
            control={control}
            name="description"
            rules={{
              required: 'Description is required',
              minLength: { value: 10, message: 'Minimum 10 characters' },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter description"
                multiline
                style={[
                  styles.input,
                  { height: 100 },
                  errors.description && styles.errorInput,
                ]}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          {errors.description && (
            <Text style={styles.errorText}>{errors.description.message}</Text>
          )}

          <Text style={styles.label}>Assign To</Text>

          <Controller
            control={control}
            name="assignedToUser"
            rules={{ required: 'User is required' }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={[
                  styles.dropdown,
                  errors.assignedTo && styles.errorInput,
                ]}
                data={users}
                labelField="label"
                valueField="value"
                placeholder="Select User"
                value={value}
                onChange={item => onChange(item.value)}
              />
            )}
          />

          {errors.assignedTo && (
            <Text style={styles.errorText}>{errors.assignedTo.message}</Text>
          )}

          <Text style={styles.label}>Status</Text>

          <Controller
            control={control}
            name="status"
            rules={{ required: 'Status is required' }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={[styles.dropdown, errors.status && styles.errorInput]}
                data={statusData}
                labelField="label"
                valueField="value"
                placeholder="Select status"
                value={value}
                onChange={item => onChange(item.value)}
              />
            )}
          />

          {errors.status && (
            <Text style={styles.errorText}>{errors.status.message}</Text>
          )}

          <Text style={styles.label}>Priority</Text>

          <Controller
            control={control}
            name="priority"
            rules={{ required: 'Priority is required' }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={[styles.dropdown, errors.priority && styles.errorInput]}
                data={priorityData}
                labelField="label"
                valueField="value"
                placeholder="Select priority"
                value={value}
                onChange={item => onChange(item.value)}
              />
            )}
          />

          {errors.priority && (
            <Text style={styles.errorText}>{errors.priority.message}</Text>
          )}

          <Text style={styles.label}>Due Date</Text>

          <TouchableOpacity
            style={[styles.dateBtn, !date && styles.errorInput]}
            onPress={() => setCalendarVisible(true)}
          >
            <Text style={styles.dateText}>
              {date ? date : 'Select Due Date'}
            </Text>
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
                    [date]: {
                      selected: true,
                      selectedColor: '#FF7A00',
                    },
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
            <Text style={styles.buttonText}>Create Task</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
