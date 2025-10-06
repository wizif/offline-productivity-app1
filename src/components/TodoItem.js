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
            {new Date(item.createdAt).toLocaleDateString()}
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: colors.gray,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
  deleteButton: {
    padding: 8,
  },
});
