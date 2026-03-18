import { useForm } from 'react-hook-form';
import { registerUser } from '@/api/userApi';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export function useRegister() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async data => {
    try {
      const response = await registerUser(data);

      if (response) {
        navigation.navigate('Login');
      }

      Toast.show({
        type: 'success',
        text1: 'Register successful',
        text2: response?.data?.message,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message || 'Register failed',
      });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    navigation
  };
}
