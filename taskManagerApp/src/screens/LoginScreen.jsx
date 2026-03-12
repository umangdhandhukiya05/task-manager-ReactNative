import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '@/api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      const response = await loginUser(data);
      console.log(response);

      const token = response?.data?.token;

      await AsyncStorage.setItem('token', token);

      navigation.replace('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
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
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F5F5F5',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },

  error: {
    color: '#D9534F',
    marginBottom: 10,
  },

  loginBtn: {
    height: 50,
    backgroundColor: '#FF7A00',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  loginText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  registerText: {
    color: '#555',
  },

  registerBtn: {
    color: '#FF7A00',
    fontWeight: '600',
  },
});
