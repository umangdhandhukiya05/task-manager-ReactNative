import React from 'react';
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';

import ProjectCard from '../components/ProjectCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/style/home';
import { useHome } from '@/hooks/useHome';


export default function HomeScreen({ navigation }) {
  const {
    projects,
    initialLoading,
    refreshing,
    search,
    handleSearch,
    loadMore,
    handleRefresh,
    handleDelete,
    user,
  } = useHome();

  if (initialLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <Text style={styles.welcomeUser}>Welcome, {user?.name}</Text>

      <View style={styles.topBar}>
        <TextInput
          placeholder="Search projects..."
          value={search}
          onChangeText={handleSearch}
          style={styles.search}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProject')}
        >
          <Text style={styles.addText}>＋</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={projects}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={() =>
              navigation.navigate('ProjectDetail', { id: item._id })
            }
            onEdit={() => navigation.navigate('EditProject', { project: item })}
            onDelete={handleDelete}
            onViewTasks={() =>
              navigation.navigate('ProjectTasks', { id: item._id })
            }
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}
