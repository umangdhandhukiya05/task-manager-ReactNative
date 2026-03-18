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
import { useEditTask } from '@/hooks/useEditTask';

export default function EditTaskScreen({ route }) {
  const { task } = route.params;

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
  } = useEditTask(task);

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
                <ActivityIndicator size="small" color="#fff" />
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
