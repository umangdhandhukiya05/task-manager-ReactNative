import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { styles } from '@/style/addProjectForm';
import { useForm } from 'react-hook-form';
import { addProject } from '@/api/projectApi';
import Toast from 'react-native-toast-message';
import FormInput from '@/components/FormInput';
import { ValidationRules } from '@/constants/formConstants';

export default function AddProjectScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{ marginLeft: 8 }}
            />
            <Text style={styles.buttonText}>Project Creating...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Add Project</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
