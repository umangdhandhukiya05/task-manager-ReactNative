import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { enableScreens } from 'react-native-screens';
import HomeScreen from '@/screens/HomeScreen';
import LoginScreen from '@/screens/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import AddProjectScreen from '@/screens/AddProjectScreen';
import EditProjectScreen from '@/screens/EditProjectScreen';
import TaskScreen from '@/screens/TaskScreen';
import AddTaskScreen from '@/screens/AddTaskScreen';
import { Provider, useDispatch } from 'react-redux';
import { getUser } from '@/api/userApi';
import { setUser } from '@/store/authSlice';
import { store } from '@/store/appStore';

const Stack = createNativeStackNavigator();

enableScreens();

function AppContent() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const data = await getUser();
      dispatch(setUser(data.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Projects' }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
