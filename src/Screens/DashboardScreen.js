import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {storage} from '../utils/storage';
import {colors} from '../styles/colors';

export const DashboardScreen = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    const data = await storage.getAnalytics();
    setAnalytics(data);
  };

  const getDatesList = () => {
    return Object.keys(analytics)
      .sort()
      .reverse()
      .slice(0, 30); // Last 30 days
  };

  const formatDate = dateStr => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  const renderDayCard = dateKey => {
    const data = analytics[dateKey];
    const percentage =
      data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;

    return (
      <View key={dateKey} style={styles.dayCard}>
        <View style={styles.dayHeader}>
          <Text style={styles.dayDate}>{formatDate(dateKey)}</Text>
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  percentage === 100
                    ? colors.success
                    : percentage >= 50
                    ? colors.warning
                    : colors.danger,
              },
            ]}>
            <Text style={styles.badgeText}>{percentage}%</Text>
          </View>
        </View>

        <View style={styles.dayStats}>
          <View style={styles.stat}>
            <Icon name="assignment" size={20} color={colors.primary} />
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{data.total}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.stat}>
            <Icon name="check-circle" size={20} color={colors.success} />
            <Text style={styles.statLabel}>Done</Text>
            <Text style={styles.statValue}>{data.completed}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.stat}>
            <Icon name="pending" size={20} color={colors.warning} />
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>{data.total - data.completed}</Text>
          </View>
        </View>
      </View>
    );
  };

  const dates = getDatesList();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <Text style={styles.subText}>Daily activity history</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {dates.length === 0 ? (
          <View style={styles.empty}>
            <Icon name="history" size={64} color={colors.light} />
            <Text style={styles.emptyText}>No history yet</Text>
            <Text style={styles.emptySubtext}>
              Start completing tasks to see your progress
            </Text>
          </View>
        ) : (
          dates.map(dateKey => renderDayCard(dateKey))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
   header: {
    backgroundColor: colors.dark,  // Changed from colors.primary
    padding: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59, 130, 246, 0.2)',
  },
  headerText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  },
  dayCard: {
    backgroundColor: colors.cardBg,  // Changed from colors.white
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dayDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
  },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: colors.gray,
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
});
