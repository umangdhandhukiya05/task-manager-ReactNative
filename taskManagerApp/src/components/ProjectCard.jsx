import { Icon } from '@rneui/themed';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '@/style/projectCard';
import { useSelector } from 'react-redux';

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onViewTasks,
  onPress,
}) {
  //from redux store
  const user = useSelector(state => state.auth.user);
  const currentUserId = user?._id;

  const isCreator = currentUserId === project?.user?._id;

  return (
    //project card
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title} numberOfLines={1}>
          {project.title}
        </Text>

        <Text style={styles.creator}>Created by: {project?.user?.name}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {project.description}
        </Text>

        <View style={styles.actions}>
          {/* view task button */}
          <TouchableOpacity
            style={styles.taskBtn}
            onPress={() => onViewTasks(project._id)}
          >
            <Text style={styles.taskText}>View Tasks</Text>
          </TouchableOpacity>

          {/* edit button */}
          {isCreator && (
            <View style={styles.btn}>
              <TouchableOpacity onPress={() => onEdit(project)}>
                <Icon name="edit" type="material" color="green" />
              </TouchableOpacity>

              {/* delete button */}
              <TouchableOpacity onPress={() => onDelete(project._id)}>
                <Icon name="delete" type="material" color="red" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
