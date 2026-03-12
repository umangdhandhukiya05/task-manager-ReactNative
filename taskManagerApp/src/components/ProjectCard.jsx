
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onViewTasks,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{project.title}</Text>

      <Text style={styles.description}>{project.description}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.taskBtn}
          onPress={() => onViewTasks(project._id)}
        >
          <Text style={styles.taskText}>View Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => onEdit(project)}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(project._id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },

  description: {
    marginTop: 6,
    color: '#666',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },

  taskBtn: {
    backgroundColor: '#ECFDF5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },

  taskText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 13,
  },

  editBtn: {
    borderWidth: 1,
    borderColor: '#F59E0B',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },

  editText: {
    color: '#F59E0B',
    fontWeight: '600',
    fontSize: 13,
  },

  deleteBtn: {
    borderWidth: 1,
    borderColor: '#EF4444',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  deleteText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 13,
  },
});
