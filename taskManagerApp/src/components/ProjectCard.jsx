import { Icon } from '@rneui/themed';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '@/style/projectCard';

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onViewTasks,
  onPress,
}) {
  return (
    //project card
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title}>{project.title}</Text>

        <Text style={styles.description}>{project.description}</Text>

        <View style={styles.actions}>
          {/* view task button */}
          <TouchableOpacity
            style={styles.taskBtn}
            onPress={() => onViewTasks(project._id)}
          >
            <Text style={styles.taskText}>View Tasks</Text>
          </TouchableOpacity>

          {/* edit button */}
          <View style={styles.btn}>
            <TouchableOpacity onPress={() => onEdit(project)}>
              <Icon name="edit" type="material" color="green" />
            </TouchableOpacity>

            {/* delete button */}
            <TouchableOpacity onPress={() => onDelete(project._id)}>
              <Icon name="delete" type="material" color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
