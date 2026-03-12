import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { registerUser } from '@/api/userApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { styles } from '@/style/regForm';

export default function RegisterScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
      console.log('Registration failed', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View>
          <Text style={styles.title}>Register Form</Text>

          <Controller
            control={control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter name"
                placeholderTextColor="#888"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />

          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />

          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password required',
              minLength: {
                value: 6,
                message: 'Minimum 6 characters',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter password"
                secureTextEntry
                placeholderTextColor="#888"
                value={value}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />

          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text>Already have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
