import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getSingleProject } from '@/api/projectApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/style/projectDetail';

export default function ProjectDetailScreen({ route }) {
  const { id } = route.params;

  const [project, setProject] = useState(null);

  const fetchProject = async () => {
    try {
      const res = await getSingleProject(id);
      setProject(res.data.project);
      // console.log(project)
    } catch (error) {
      console.log('Project fetch error', error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const formatDate = date => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  if (!project) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF7A00" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{project.title}</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{project.description}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Created By</Text>
            <Text style={styles.value}>{project.user?.name}</Text>
          </View>

          <View>
            <Text style={styles.label}>Created At</Text>
            <Text style={styles.value}>{formatDate(project.createdAt)}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
