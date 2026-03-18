import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';

import { styles } from '@/style/addTaskForm';
import { ValidationRules } from '@/constants/formConstants';
import FormInput from '@/components/FormInput';
import FormSelect from '@/components/DropDown';
import { useAddTask } from '@/hooks/useAddTask';

export default function AddTaskScreen({ route }) {
  const { projectId } = route.params;

  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,

    calendarVisible,
    setCalendarVisible,

    date,
    setDate,
    today,

    users,
    statusData,
    priorityData,

    onSubmit,
  } = useAddTask(projectId);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Add New Task</Text>

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
            rules={{ required: 'User is required' }}
            options={users}
            errors={errors}
            placeholder="Select User"
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
            style={[styles.dateBtn, !date && styles.errorInput]}
            onPress={() => setCalendarVisible(true)}
          >
            <Text style={styles.dateText}>{date || 'Select Due Date'}</Text>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.buttonText}>Task Assigning...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Add Task</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
