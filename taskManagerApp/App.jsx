import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { enableScreens } from 'react-native-screens';
import { Provider, useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';
import Toast from 'react-native-toast-message';

import { store } from '@/store/appStore';
import { setUser, clearUser } from '@/store/authSlice';
import { getUser } from '@/api/userApi';

import HomeScreen from '@/screens/HomeScreen';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import AddProjectScreen from '@/screens/AddProjectScreen';
import EditProjectScreen from '@/screens/EditProjectScreen';
import TaskScreen from '@/screens/TaskScreen';
import AddTaskScreen from '@/screens/AddTaskScreen';
import EditTaskScreen from '@/screens/EditTaskScreen';
import ProjectDetailScreen from '@/screens/ProjectDetailScreen';

const Stack = createNativeStackNavigator();

enableScreens();

function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const fetchUser = async () => {
    try {
      const data = await getUser();
      dispatch(setUser(data.data.user));
    } catch (error) {
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        fetchUser();
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(clearUser());
  };

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Projects',
              headerBackVisible: false,
              headerRight: () => (
                <Button title="Logout" color="#FF7A00" onPress={handleLogout} />
              ),
            }}
          />

          <Stack.Screen
            name="ProjectDetail"
            component={ProjectDetailScreen}
            options={{
              title: 'Project Detail',
              headerBackButtonDisplayMode: 'minimal',
            }}
          />

          <Stack.Screen
            name="AddProject"
            component={AddProjectScreen}
            options={{ headerBackButtonDisplayMode: 'minimal' }}
          />

          <Stack.Screen
            name="EditProject"
            component={EditProjectScreen}
            options={{ headerBackButtonDisplayMode: 'minimal' }}
          />

          <Stack.Screen
            name="ProjectTasks"
            component={TaskScreen}
            options={{ title: 'Tasks' }}
          />

          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{ title: 'Add Task' }}
          />

          <Stack.Screen
            name="EditTask"
            component={EditTaskScreen}
            options={{ title: 'Edit Task' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContent />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
