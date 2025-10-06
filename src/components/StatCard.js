import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../styles/colors';

export const StatCard = ({icon, label, value, color, percentage}) => {
  return (
    <View style={[styles.container, {borderLeftColor: color}]}>
      <View style={[styles.iconContainer, {backgroundColor: color + '20'}]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        {percentage !== undefined && (
          <Text style={[styles.percentage, {color: color}]}>
            {percentage}%
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,  // Changed from colors.white
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  percentage: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
