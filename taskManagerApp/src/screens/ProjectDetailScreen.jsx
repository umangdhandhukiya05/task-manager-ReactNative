import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/style/projectDetail';
import { useProjectDetail } from '@/hooks/useProjectDetail';

export default function ProjectDetailScreen({ route }) {
  const { id } = route.params;

  const { project, loading, formatDate } = useProjectDetail(id);

  if (loading) {
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
