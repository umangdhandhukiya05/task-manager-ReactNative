import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { allUsers } from '@/api/userApi';
import { addTask } from '@/api/taskApi';
import Toast from 'react-native-toast-message';
import { DropDownOption } from '@/constants/formConstants';
import { useNavigation } from '@react-navigation/native';

export function useAddTask(projectId) {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [date, setDate] = useState(null);
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
  }, []);

  const onSubmit = async data => {
    try {
      const taskDetail = {
        ...data,
        dueDate: date,
      };

      const result = await addTask(projectId, taskDetail);

      Toast.show({
        type: 'success',
        text1: result?.data?.message,
      });

      navigation.goBack();
    } catch (error) {
      console.log('Create task error:', error);
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
