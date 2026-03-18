import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { allUsers } from '@/api/userApi';
import { updateTask } from '@/api/taskApi';
import { styles } from '@/style/addTaskForm';
import { DropDownOption, ValidationRules } from '@/constants/formConstants';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/DropDown';

export default function EditTaskScreen({ route, navigation }) {
  const { task } = route.params;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(task.dueDate);
  const [users, setUsers] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  const statusData = DropDownOption.statusDropDown;
  const priorityData = DropDownOption.priorityDropDown;

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

          <FormInput
            control={control}
            name="title"
            rules={ValidationRules.title}
            placeholder="Enter task title"
            errors={errors}
            style={styles.input}
          />

          <Text style={styles.label}>Description</Text>

          <FormInput
            control={control}
            name="description"
            rules={ValidationRules.description}
            placeholder="Enter description"
            errors={errors}
            style={[styles.input, { height: 100 }]}
            multiline
          />

          <Text style={styles.label}>Assign To</Text>

          <FormSelect
            control={control}
            name="assignedToUser"
            rules={{ required: 'User required' }}
            options={users}
            errors={errors}
            placeholder="Select user"
            style={styles.dropdown}
          />

          <Text style={styles.label}>Status</Text>

          <FormSelect
            control={control}
            name="status"
            rules={ValidationRules.status}
            options={statusData}
            errors={errors}
            placeholder="Select status"
            style={styles.dropdown}
          />

          <Text style={styles.label}>Priority</Text>

          <FormSelect
            control={control}
            name="priority"
            rules={ValidationRules.priority}
            options={priorityData}
            errors={errors}
            placeholder="Select priority"
            style={styles.dropdown}
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{ marginLeft: 8 }}
                />
                <Text style={styles.buttonText}>Updating...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Update Task</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
