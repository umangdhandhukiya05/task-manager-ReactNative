import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { allUsers } from '@/api/userApi';
import { updateTask } from '@/api/taskApi';
import { Alert } from 'react-native';
import { DropDownOption } from '@/constants/formConstants';
import { useNavigation } from '@react-navigation/native';

export function useEditTask(task) {
  const navigation = useNavigation();

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

      setUsers(formattedUsers || []);
    } catch (error) {
      console.log('User fetch error:', error);
    }
  };

  useEffect(() => {
    getUsers();

    // Prefill form
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

  return {
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
  };
}
