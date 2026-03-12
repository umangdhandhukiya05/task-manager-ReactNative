import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { addProject } from '@/api/projectApi';

export default function AddProjectScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    await addProject(data);

    Alert.alert('Success', 'Project created successfully');

    navigation.goBack();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },

  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  error: {
    color: 'red',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#FF7A00',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
