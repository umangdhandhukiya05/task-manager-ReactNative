import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateProject } from '@/api/projectApi';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function useEditProject(project) {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    setValue('title', project.title);
    setValue('description', project.description);
  }, []);

  const onSubmit = async (data) => {
    try {
      await updateProject(project._id, data);

      Alert.alert('Success', 'Project updated successfully');
      navigation.goBack();
    } catch (error) {
      console.log('Update error:', error);
      Alert.alert('Error', 'Failed to update project');
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