import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { updateProject } from '@/api/projectApi';
import { styles } from '@/style/addProjectForm';

export default function EditProjectScreen({ route, navigation }) {
  const { project } = route.params;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
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

      <Controller
        control={control}
        name="title"
        rules={{ required: 'Title is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Project title"
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <Controller
        control={control}
        name="description"
        rules={{ required: 'Description is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Project description"
            value={value}
            onChangeText={onChange}
            style={[styles.input, styles.textArea]}
            multiline
          />
        )}
      />

      {errors.description && (
        <Text style={styles.error}>{errors.description.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Update Project</Text>
      </TouchableOpacity>
    </View>
  );
}
