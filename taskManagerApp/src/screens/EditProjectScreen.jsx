import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { styles } from '@/style/addProjectForm';
import FormInput from '@/components/FormInput';
import { ValidationRules } from '@/constants/formConstants';
import { useEditProject } from '@/hooks/useEditProject';

export default function EditProjectScreen({ route }) {
  const { project } = route.params;

  const { control, handleSubmit, errors, isSubmitting, onSubmit } =
    useEditProject(project);

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

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.buttonText}>Updating...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Update Project</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
