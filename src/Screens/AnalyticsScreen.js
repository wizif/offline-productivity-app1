import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import {StatCard} from '../components/StatCard';
import {storage} from '../utils/storage';
import {colors} from '../styles/colors';

const screenWidth = Dimensions.get('window').width;

export const AnalyticsScreen = () => {
  const [todos, setTodos] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const todosData = await storage.getTodos();
    const analyticsData = await storage.getAnalytics();
    setTodos(todosData);
    setAnalytics(analyticsData);
  };

  const getTodayStats = () => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {total, completed, active, percentage};
  };

  const getLast7DaysData = () => {
    const days = [];
    const completedData = [];
    const totalData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', {weekday: 'short'});

      days.push(dayName);
      const dayStats = analytics[dateKey] || {completed: 0, total: 0};
      completedData.push(dayStats.completed);
      totalData.push(dayStats.total);
    }

    return {days, completedData, totalData};
  };

  const getWeeklyAverage = () => {
    const {completedData} = getLast7DaysData();
    const sum = completedData.reduce((a, b) => a + b, 0);
    return Math.round(sum / 7);
  };

  const stats = getTodayStats();
  const weekData = getLast7DaysData();
  const weeklyAvg = getWeeklyAverage();

  const chartConfig = {
    backgroundColor: colors.cardBg,
    backgroundGradientFrom: colors.cardBg,
    backgroundGradientTo: colors.cardBg,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => colors.textLight,
    style: {borderRadius: 16},
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Analytics</Text>
        <Text style={styles.subText}>Your productivity insights</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>

        <StatCard
          icon="assignment"
          label="Total Tasks"
          value={stats.total}
          color={colors.primary}
        />

        <StatCard
          icon="check-circle"
          label="Completed"
          value={stats.completed}
          color={colors.success}
          percentage={stats.percentage}
        />

        <StatCard
          icon="pending"
          label="Active Tasks"
          value={stats.active}
          color={colors.warning}
        />

        <StatCard
          icon="trending-up"
          label="Weekly Average"
          value={weeklyAvg}
          color={colors.secondary}
        />

        <Text style={styles.sectionTitle}>Last 7 Days - Completed Tasks</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: weekData.days,
              datasets: [{data: weekData.completedData.length > 0 ? weekData.completedData : [0]}],
            }}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <Text style={styles.sectionTitle}>Last 7 Days - All Tasks</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: weekData.days,
              datasets: [{data: weekData.totalData.length > 0 ? weekData.totalData : [0]}],
            }}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
            }}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Keep up the great work! 🎉</Text>
        </View>
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
    backgroundColor: colors.dark,
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
  subText: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
    marginBottom: 12,
  },
  chartContainer: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chart: {
    borderRadius: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  footerText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '600',
  },
});
