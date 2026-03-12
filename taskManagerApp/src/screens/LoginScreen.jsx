import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { getUser, loginUser } from '@/api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';
import { styles } from '@/style/authForm';

export default function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async data => {
    try {
      const res = await loginUser(data);

      const token = res.data.token;

      await AsyncStorage.setItem('token', token);

      const response = await getUser();

      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View>
          <Text style={styles.title}>Login form</Text>

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter email"
                value={value}
                keyboardType="email-address"
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
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Minimum 6 characters',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Enter password"
                secureTextEntry
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
            style={styles.loginBtn}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerBtn}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
