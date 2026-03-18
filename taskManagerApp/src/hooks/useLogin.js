import { useForm } from 'react-hook-form';
import { loginUser, getUser } from '@/api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';

export function useLogin(navigation) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async data => {
    try {
      const res = await loginUser(data);
      const token = res.data.token;

      await AsyncStorage.setItem('token', token);

      const response = await getUser();
      dispatch(setUser(response.data.user));

      Toast.show({
        type: 'success',
        text1: res.data.message,
      });

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message || 'Login failed',
      });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
