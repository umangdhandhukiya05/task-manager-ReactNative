import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { updateProject } from '@/api/projectApi';
import { styles } from '@/style/addProjectForm';
import FormInput from '@/components/FormInput';
import { ValidationRules } from '@/constants/formConstants';

export default function EditProjectScreen({ route, navigation }) {
  const { project } = route.params;

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

  const onSubmit = async data => {
    try {
      await updateProject(project._id, data);

      Alert.alert('Success', 'Project updated successfully');

      navigation.goBack();
    } catch (error) {
      console.log('Update error:', error);
      Alert.alert('Error', 'Failed to update project');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Project</Text>

      <FormInput
        control={control}
        name="title"
        rules={ValidationRules.title}
        placeholder="Project title"
        errors={errors}
        style={styles.input}
      />

      <FormInput
        control={control}
        name="description"
        rules={ValidationRules.description}
        placeholder="Project description"
        errors={errors}
        style={[styles.input, styles.textArea]}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
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
          <Text style={styles.buttonText}>Update Project</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
