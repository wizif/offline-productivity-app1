import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../styles/colors';

export const NoteCard = ({item, onPress, onDelete}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title || 'Untitled Note'}
        </Text>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Icon name="delete-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
      <Text style={styles.content} numberOfLines={3}>
        {item.content}
      </Text>
      <Text style={styles.date}>
        {new Date(item.updatedAt).toLocaleDateString()} at{' '}
        {new Date(item.updatedAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  content: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
    lineHeight: 20,
  },
  date: {
    fontSize: 11,
    color: colors.gray,
  },
});
