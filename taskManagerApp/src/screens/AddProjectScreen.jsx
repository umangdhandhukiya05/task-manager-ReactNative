import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { styles } from '@/style/addProjectForm';
import { useForm, Controller } from 'react-hook-form';
import { addProject } from '@/api/projectApi';
import Toast from 'react-native-toast-message';

export default function AddProjectScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const response = await addProject(data);
    navigation.goBack();
    Toast.show({
      type: 'success',
      text1: 'Project created successfully',
      text2: response?.data?.message,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Project</Text>

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
        <Text style={styles.buttonText}>Create Project</Text>
      </TouchableOpacity>
    </View>
  );
}

