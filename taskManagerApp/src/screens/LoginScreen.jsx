import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { getUser, loginUser } from '@/api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';
import { styles } from '@/style/authForm';
import FormInput from '@/components/FormInput';
import { ValidationRules } from '@/constants/formConstants';

export default function LoginScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async data => {
    try {
      const res = await loginUser(data);
      const token = res.data.token;

      await AsyncStorage.setItem('token', token);

      const response = await getUser();
      dispatch(setUser(response.data.user));

      Toast.show({
        type: 'success',
        text1: res.data.message,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View>
          <Text style={styles.title}>Login form</Text>

          <FormInput
            control={control}
            name="email"
            rules={ValidationRules.email}
            placeholder="Enter email"
            errors={errors}
            keyboardType="email-address"
            style={styles.input}
          />

          <FormInput
            control={control}
            name="password"
            rules={ValidationRules.password}
            placeholder="Enter password"
            errors={errors}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{ marginLeft: 8 }}
                />
                <Text style={styles.buttonText}>Signing in..</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
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
