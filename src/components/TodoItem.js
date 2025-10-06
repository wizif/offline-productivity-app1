import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../styles/colors';

export const TodoItem = ({item, onToggle, onDelete, onEdit}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.content}
        onPress={() => onToggle(item.id)}
        onLongPress={() => onEdit(item)}>
        <View
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
          {item.completed && (
            <Icon name="check" size={18} color={colors.white} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[styles.text, item.completed && styles.textCompleted]}
            numberOfLines={2}>
            {item.text}
          </Text>
          <Text style={styles.date}>
            {new Date(item.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}>
        <Icon name="delete-outline" size={22} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.15)',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,  // Rounded square instead of circle
    borderWidth: 2,
    borderColor: '#3B82F6',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 6,
    lineHeight: 22,
    fontWeight: '500',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
    opacity: 0.5,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
  },
});
