import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { styles } from '@/style/addProjectForm';
import FormInput from '@/components/FormInput';
import { ValidationRules } from '@/constants/formConstants';
import { useAddProject } from '@/hooks/useAddProject';

export default function AddProjectScreen() {
  const { control, handleSubmit, errors, isSubmitting, onSubmit } =
    useAddProject();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Project</Text>

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

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.buttonText}>Project Creating...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Add Project</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
