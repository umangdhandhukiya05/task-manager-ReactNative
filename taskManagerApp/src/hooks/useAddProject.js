import { useForm } from 'react-hook-form';
import { addProject } from '@/api/projectApi';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export function useAddProject() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async data => {
    try {
      const response = await addProject(data);

      Toast.show({
        type: 'success',
        text1: 'Project created successfully',
        text2: response?.data?.message,
      });

      navigation.goBack();
    } catch (error) {
      console.log('Create project error:', error);

      Toast.show({
        type: 'error',
        text1: 'Failed to create project',
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
